const express = require("express");
const { Register, Login } = require("../Controller/AuthController");
const RegValidator = require("../middlewares/RegValidator");
const { userModel } = require("../models/userModel");
const userRoute = express.Router();

userRoute.post("/register",RegValidator, Register);

userRoute.post("/login",Login)

module.exports = {
  userRoute,
};
