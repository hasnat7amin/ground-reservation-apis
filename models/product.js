const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    stock: Number,
    sales: Number,
  },
  {
    timestamps: true,
    collection: "Product",
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
