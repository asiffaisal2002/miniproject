// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false; // To prevent multiple connections

export const connectToDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    // 👇 This is the line you asked about
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "mydatabase", // MongoDB will create this database automatically
    });

    isConnected = true;
    console.log("🚀 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
