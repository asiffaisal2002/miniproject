import mongoose, { Schema, model, models } from "mongoose";
import { NextResponse } from "next/server";

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Please set it in .env.local");
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI as string);
      console.log("✅ MongoDB Connected");
    }
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

// ✅ Mentor Schema
const MentorSchema = new Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    hobbies: String,
    interests: String,
    skills: String,
    contact: String, // 👈 new contact field
  },
  { timestamps: true }
);

const Mentor = models.Mentor || model("Mentor", MentorSchema);

// ✅ POST (Add a Mentor)
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    if (!body.name || !body.course) {
      return NextResponse.json(
        { error: "Name and course are required." },
        { status: 400 }
      );
    }

    const newMentor = await Mentor.create({
      name: body.name,
      course: body.course,
      hobbies: body.hobbies,
      interests: body.interests,
      skills: body.skills,
      contact: body.contact, // 👈 included
    });

    return NextResponse.json(newMentor, { status: 201 });
  } catch (error) {
    console.error("Error adding mentor:", error);
    return NextResponse.json({ error: "Failed to add mentor" }, { status: 500 });
  }
}

// ✅ GET (Fetch Mentors)
export async function GET() {
  try {
    await connectDB();
    const mentors = await Mentor.find().sort({ createdAt: -1 });
    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json({ error: "Failed to fetch mentors" }, { status: 500 });
  }
}
