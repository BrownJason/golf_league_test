/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

export async function GET() {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";

  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: "", // adjust if your images are in a folder
  });

  try {
    const data = await s3.send(command);
    // Debug: log all object keys
    const allKeys = (data.Contents || []).map(obj => obj.Key);
    
    const images = (data.Contents || [])
      .filter(obj => obj.Key && /\.(jpg|jpeg|png|gif)$/i.test(obj.Key))
      .map(obj => ({
        src: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
        title: obj.Key?.split("/").pop() || "",
        description: "",
      }));

    return NextResponse.json(images);
  } catch (err) {
    console.error("S3 fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}