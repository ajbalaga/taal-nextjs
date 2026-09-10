import { presignUpload, publicUrl } from "@/lib/r2";
import { collections } from "@/lib/mongodb";
import { isAdmin, unauthorized } from "@/lib/auth";

// Two-step upload: the browser asks for a signed URL, PUTs the PDF straight to
// Cloudflare R2, then we record the metadata in MongoDB. The file never passes
// through the server, so there is no request-size limit to worry about.
export async function POST(request) {
  if (!isAdmin(request)) return unauthorized();

  const { filename, name, meta, contentType } = await request.json();
  if (!filename || !name) {
    return Response.json({ error: "filename and name are required" }, { status: 400 });
  }

  const safe = filename.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-");
  const key = `forms/${Date.now()}-${safe}`;

  try {
    const uploadUrl = await presignUpload(key, contentType || "application/pdf");
    const { forms } = await collections();
    await forms.updateOne(
      { name },
      { $set: { name, meta: meta || "PDF", key, updatedAt: new Date() } },
      { upsert: true }
    );
    return Response.json({ uploadUrl, key, publicUrl: publicUrl(key) });
  } catch (err) {
    console.error("forms/upload —", err.message);
    return Response.json({ error: "R2 is not configured. Keep forms in /public/forms for now." }, { status: 503 });
  }
}
