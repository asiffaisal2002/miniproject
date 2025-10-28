import { connectToDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  await connectToDB();
  res.status(200).json({ message: "MongoDB Connected Successfully!" });
}
