import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 200,
  },
  description: {
    type: String,
    required: false,
    maxLength: 600,
  },
  imageUrl: {
    type: String,
    required: true,
    maxLength: 200,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default model("Product", productSchema);
