import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const mentors = await db.collection("mentorship_users").find({}).toArray();

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentorship users:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
