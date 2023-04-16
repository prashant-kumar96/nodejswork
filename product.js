import mongoose from "mongoose";
import { Schema } from "mongoose";
const productSchema = new Schema({
  name: String,
  price: Number,
  brand: String,
  category: String,
});

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
