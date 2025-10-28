import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";
import { connectToDB } from "@/lib/mongodb";
import Item from "@/models/Item";

// Disable Next.js body parsing, since multer handles it
export const config = {
  api: { bodyParser: false },
};

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Helper to convert multer to Promise form
const runMiddleware = (req: any, res: any, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

// ✅ Main Handler
export default async function handler(req: any, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, upload.single("image"));

      const { name, description, price, category } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : "";

      await connectToDB();

      const newItem = new Item({
        name,
        description,
        price,
        category,
        image,
      });

      await newItem.save();

      return res.status(200).json({ message: "Item added successfully", newItem });
    } catch (error: any) {
      console.error("Error adding item:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
