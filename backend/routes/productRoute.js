const express=require("express")
const { AddProduct, GetProduct, DeleteProduct } = require("../Controller/ProductController")
const { productModel } = require("../models/productModel")
const productRoute=express.Router()

productRoute.post("/",AddProduct)

productRoute.get("/",GetProduct)

productRoute.delete("/",DeleteProduct)

module.exports={
    productRoute
}