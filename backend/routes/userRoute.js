const express = require("express");
const { Register, Login } = require("../Controller/AuthController");
const RegValidator = require("../middlewares/RegValidator");
const { userModel } = require("../models/userModel");
const userRoute = express.Router();

userRoute.post("/register",RegValidator, Register);
userRoute.post("/login",Login)
userRoute.patch("/:id",async(req,res)=>{
  const {id}=req.params
  try {
     await userModel.findByIdAndUpdate({_id:id},req.body)
     res.send(await userModel.findOne({_id:id}))
  } catch (error) {
    res.status(400).send(error.messsage)
  }
})

module.exports = {
  userRoute,
};
