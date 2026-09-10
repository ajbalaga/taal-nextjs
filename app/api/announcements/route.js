import { collections } from "@/lib/mongodb";
import { getAnnouncements } from "@/lib/announcements";
import { isAdmin, unauthorized } from "@/lib/auth";

export async function GET(request) {
  const cat = new URL(request.url).searchParams.get("cat") || "all";
  return Response.json(await getAnnouncements(cat));
}

export async function POST(request) {
  if (!isAdmin(request)) return unauthorized();

  const body = await request.json();
  const required = ["title", "blurb", "tag", "cat", "source"];
  const missing = required.filter(k => !body[k]);
  if (missing.length) {
    return Response.json({ error: `Missing: ${missing.join(", ")}` }, { status: 400 });
  }

  const doc = {
    title: String(body.title).slice(0, 200),
    blurb: String(body.blurb).slice(0, 2000),
    tag: String(body.tag).slice(0, 40),
    cat: String(body.cat),                 // advisory | events | health
    source: String(body.source).slice(0, 120),
    date: body.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    publishedAt: new Date()
  };

  const { announcements } = await collections();
  const res = await announcements.insertOne(doc);
  return Response.json({ _id: String(res.insertedId) }, { status: 201 });
}
