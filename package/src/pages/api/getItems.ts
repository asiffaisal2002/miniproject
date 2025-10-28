import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongodb";
import Item from "@/models/Item";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDB();

  if (req.method === "GET") {
    try {
      const items = await Item.find({});
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
