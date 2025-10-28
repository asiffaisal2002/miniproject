// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Prevent re-registering model when Next.js refreshes
export default mongoose.models.User || mongoose.model("User", UserSchema);
