import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Cloudflare R2 speaks the S3 API, so the AWS SDK works unchanged.
// Egress is free and the first 10 GB of storage costs nothing, which covers
// this site's PDF forms indefinitely.
export function r2() {
  const account = process.env.R2_ACCOUNT_ID;
  if (!account) throw new Error("R2 is not configured");
  return new S3Client({
    region: "auto",
    endpoint: `https://${account}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
  });
}

// Hand the browser a short-lived URL so the PDF never passes through the server.
export async function presignUpload(key, contentType = "application/pdf") {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType
  });
  return getSignedUrl(r2(), command, { expiresIn: 600 });
}

export function publicUrl(key) {
  const base = process.env.R2_PUBLIC_BASE;
  return base ? `${base}/${key}` : null;
}
