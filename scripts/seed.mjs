// Seeds the announcements collection from the design's sample notices.
// Usage: node --env-file=.env.local scripts/seed.mjs
import { MongoClient } from "mongodb";
import { NEWS, FORMS } from "../lib/data.js";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI first (node --env-file=.env.local scripts/seed.mjs)");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "taal");

await db.collection("announcements").createIndex({ publishedAt: -1 });
await db.collection("announcements").createIndex({ cat: 1 });
await db.collection("serviceRequests").createIndex({ createdAt: -1 });
await db.collection("serviceRequests").createIndex({ reference: 1 }, { unique: true });
await db.collection("forms").createIndex({ name: 1 }, { unique: true });

const existing = await db.collection("announcements").countDocuments();
if (existing === 0) {
  await db.collection("announcements").insertMany(
    NEWS.map((n, i) => ({ ...n, publishedAt: new Date(Date.now() - i * 864e5) }))
  );
  console.log(`Seeded ${NEWS.length} announcements.`);
} else {
  console.log(`Announcements already present (${existing}) — skipped.`);
}

const formCount = await db.collection("forms").countDocuments();
if (formCount === 0) {
  await db.collection("forms").insertMany(
    FORMS.map(f => ({ ...f, href: `/forms/${f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf` }))
  );
  console.log(`Seeded ${FORMS.length} form records.`);
}

console.log("Indexes ready.");
await client.close();
