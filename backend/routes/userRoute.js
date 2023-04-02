const express = require("express");
const { Register, Login } = require("../Controller/AuthController");
const RegValidator = require("../middlewares/RegValidator");
const { userModel } = require("../models/userModel");
const AuthorizationMiddleware = require("../middlewares/Authorization.middleware");
const userRoute = express.Router();

userRoute.post("/register",RegValidator, Register);
userRoute.post("/login",Login)
userRoute.patch("/",AuthorizationMiddleware, async(req,res)=>{
  const {userId}=req.body
  try {
     await userModel.findByIdAndUpdate({_id:userId},req.body)
     res.send(await userModel.findOne({_id:userId}))
  } catch (error) {
    res.status(400).send(error.messsage)
  }
})

module.exports = {
  userRoute,
};
