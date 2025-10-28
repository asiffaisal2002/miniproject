import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

export default clientPromise;

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "mydatabase",
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
