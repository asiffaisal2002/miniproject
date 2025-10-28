import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(req: Request) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" });
}
