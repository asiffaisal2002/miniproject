import mongoose, { Schema, model, models } from "mongoose";

const MentorSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  hobbies: { type: String },
  interests: { type: String },
  skills: { type: String },
  contact: { type: String }, // ✅ Added this line
});

export default models.Mentor || model("Mentor", MentorSchema);
