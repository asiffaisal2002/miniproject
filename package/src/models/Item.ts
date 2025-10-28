import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
