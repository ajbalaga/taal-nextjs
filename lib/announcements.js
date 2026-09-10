import { collections } from "@/lib/mongodb";
import { NEWS } from "@/lib/data";

// Reads announcements from MongoDB; falls back to the seeded array so the site
// still renders if the database is unreachable or not yet seeded.
export async function getAnnouncements(category) {
  try {
    const { announcements } = await collections();
    const query = category && category !== "all" ? { cat: category } : {};
    const docs = await announcements.find(query).sort({ publishedAt: -1 }).limit(50).toArray();
    if (docs.length) return docs.map(d => ({ ...d, _id: String(d._id) }));
  } catch (err) {
    console.error("announcements: falling back to seed data —", err.message);
  }
  return category && category !== "all" ? NEWS.filter(n => n.cat === category) : NEWS;
}
