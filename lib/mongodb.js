import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set. Copy .env.example to .env.local.");

// Cache the client across hot reloads in dev and across lambda invocations in prod.
let cached = global._taalMongo;
if (!cached) cached = global._taalMongo = { client: null, promise: null };

export async function getDb() {
  if (!cached.promise) {
    cached.client = new MongoClient(uri, { maxPoolSize: 10 });
    cached.promise = cached.client.connect();
  }
  await cached.promise;
  return cached.client.db(process.env.MONGODB_DB || "taal_municipality");
}

export async function collections() {
  const db = await getDb();
  return {
    announcements: db.collection("announcements"),
    serviceRequests: db.collection("serviceRequests"),
    forms: db.collection("forms")
  };
}
