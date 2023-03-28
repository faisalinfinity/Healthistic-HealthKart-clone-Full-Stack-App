const express = require("express");
const { userModel } = require("../models/userModel");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    let newUser = new userModel(req.body);
    await newUser.save();
    res.json(await userModel.find());
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = {
  userRoute,
};
