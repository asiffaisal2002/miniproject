import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDB();

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
