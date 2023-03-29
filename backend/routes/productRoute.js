const express=require("express")
const { productModel } = require("../models/productModel")
const productRoute=express.Router()

productRoute.post("/",async(req,res)=>{
    try {
        let newProduct=new productModel(req.body)
        await newProduct.save()
        res.json(req.body)
    } catch (error) {
        res.send({msg:error.message})
    }
})

module.exports={
    productRoute
}