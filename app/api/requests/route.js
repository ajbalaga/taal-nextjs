import { collections } from "@/lib/mongodb";
import { isAdmin, unauthorized } from "@/lib/auth";

function reference() {
  const year = new Date().getFullYear();
  const n = String(Math.floor(1000 + Math.random() * 9000));
  return `TAAL-${year}-${n}`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const message = (body.message || "").trim();
  if (!name || !message) {
    return Response.json({ error: "Name and details are required." }, { status: 400 });
  }
  if (name.length > 120 || message.length > 4000) {
    return Response.json({ error: "Submission is too long." }, { status: 400 });
  }

  const doc = {
    reference: reference(),
    name,
    barangay: (body.barangay || "").trim().slice(0, 80),
    contact: (body.contact || "").trim().slice(0, 120),
    topic: (body.topic || "Other inquiry").slice(0, 80),
    message,
    status: "new",
    createdAt: new Date()
  };

  try {
    const { serviceRequests } = await collections();
    await serviceRequests.insertOne(doc);
  } catch (err) {
    console.error("requests: insert failed —", err.message);
    return Response.json({ error: "We could not save your request. Please call (043) 740-6183." }, { status: 503 });
  }

  // TODO: notify the concerned office by email (Resend / SendGrid) using doc.topic.
  return Response.json({ reference: doc.reference }, { status: 201 });
}

// Staff view of the inbox.
export async function GET(request) {
  if (!isAdmin(request)) return unauthorized();
  const { serviceRequests } = await collections();
  const docs = await serviceRequests.find({}).sort({ createdAt: -1 }).limit(200).toArray();
  return Response.json(docs.map(d => ({ ...d, _id: String(d._id) })));
}
