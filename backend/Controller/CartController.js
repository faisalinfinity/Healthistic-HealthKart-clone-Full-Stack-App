const { cartModel } = require("../models/cartModel");
const { productModel } = require("../models/productModel");

const GetCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let data = await cartModel.find({ userId: userId });
    res.json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const AddCart = async (req, res) => {
  const { userId, pid } = req.body;

  try {
    let data = await cartModel.find({ userId: userId, pid });
    if (data.length) {
      return res.status(400).send("Item Already exist in the Cart");
    }

    let newCartItem = new cartModel(req.body);
    await newCartItem.save();
    res.send("Item added to cart");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const UpdateCart = async (req, res) => {
  const { userId, _id } = req.body;
  const cartId = req.params.id;

  try {
    await cartModel.findByIdAndUpdate({ _id: cartId }, req.body);
    res.send("Updated Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const DeleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    await cartModel.findByIdAndDelete({ _id: cartId });
    res.send("Deleted Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const DeleteMany = async (req, res) => {
  const { userId, _id } = req.body;
  try {
    await cartModel.deleteMany({ userId });
    res.send("All Items Deleted Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const GetSingleCart = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await cartModel.findOne({ _id: id });
    res.json(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  GetCart,
  AddCart,
  DeleteCart,
  UpdateCart,
  DeleteMany,
  GetSingleCart,
};
