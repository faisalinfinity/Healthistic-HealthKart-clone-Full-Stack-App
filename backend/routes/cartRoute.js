const express = require("express");
const {
    GetSingleCart,
  GetCart,
  AddCart,
  UpdateCart,
  DeleteCart,
  DeleteMany,
} = require("../Controller/CartController");
const AuthorizationMiddleware = require("../middlewares/Authorization.middleware");

const cartRoute = express.Router();

cartRoute.use(AuthorizationMiddleware);
cartRoute.get("/", GetCart);
cartRoute.post("/", AddCart);
cartRoute.patch("/:id", UpdateCart);
cartRoute.get("/:id",GetSingleCart)

cartRoute.delete("/:id", DeleteCart);

cartRoute.delete("/delete/all", DeleteMany);

module.exports={
    cartRoute
}
