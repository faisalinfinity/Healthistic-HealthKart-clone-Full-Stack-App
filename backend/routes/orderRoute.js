const express = require("express");
const {
  AddOrder,
  CancelOrder,
  GetSingleOrder,
  GetOrder,
} = require("../Controller/OrderController");
const AuthorizationMiddleware = require("../middlewares/Authorization.middleware");

const orderRoute = express.Router();

orderRoute.use(AuthorizationMiddleware);

orderRoute.post("/", AddOrder);
orderRoute.patch("/:id", CancelOrder);
orderRoute.get("/:id", GetSingleOrder);
orderRoute.get("/", GetOrder);

module.exports = {
  orderRoute,
};
