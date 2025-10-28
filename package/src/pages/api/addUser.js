import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json({ message: "User added successfully!" });
  }

  res.status(405).json({ message: "Only POST allowed" });
}
