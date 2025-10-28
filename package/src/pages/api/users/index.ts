import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDB();

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    try {
      const { name, email, role } = req.body;
      const newUser = new User({ name, email, role });
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
