import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
});

const User = models.User || mongoose.model("User", UserSchema);
export default User;
