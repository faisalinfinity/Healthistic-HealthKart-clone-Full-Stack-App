const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  image: { type: [String], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  sizes: { type: [String], required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: Number, required: true },
  flavour: { type: String, required: false },
  brand: { type: String, required: true },
  tags: { type: String },
  stock: { type: Number, required: true },
  adminId: { type: String, required: true },
  
  quantity: { type: Number, required: true },
  userId: { type: String, required: true },
  pid: { type: String, required: true },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = {
  cartModel,
};
