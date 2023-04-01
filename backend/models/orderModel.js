const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
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
  date:{ type: String, required: true },//automatic
  adminId: { type: String, required: true },
  userId: { type: String, required: true },
  pid: { type: String, required: true },
  quantity: { type: Number, required: true },

  delivery:{ type: String, required: true },
  status:{ type: String, required: true },//automatic
  address:{ type: String, required: true },
  payment:{ type: String, required: true }
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = {
  orderModel,
};
