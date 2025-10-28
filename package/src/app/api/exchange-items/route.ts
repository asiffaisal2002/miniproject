import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import fs from "fs/promises";
import path from "path";

// ✅ Ensure uploads folder exists inside /public
const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const contact = formData.get("contact") as string; // ✅ Added contact field
    const file = formData.get("image") as File | null;

    let imageUrl = "";

    // 🖼 Save image to /public/uploads
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    // 💾 Save to MongoDB
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const result = await db.collection("exchange_items").insertOne({
      name,
      category,
      description,
      price,
      contact,
      image: imageUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload item" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const items = await db
      .collection("exchange_items")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(items);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
