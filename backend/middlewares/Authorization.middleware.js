const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const AuthorizationMiddleware = async (req, res, next) => {
  var token
  if(req.headers.authorization){
    token = req?.headers?.authorization.split(" ")[1];
  }else{
    res.send("Please pass token in headers")
  }
  
  try {
    var decoded = jwt.verify(token, "faisal");
  } catch (error) { 
    res.status(400).send(error.message);
  }

  if (decoded) {
    let user = await userModel.find({_id: decoded.userId });
    if (user.length) {
      req.body.userId=decoded.userId
      next();
    } else {
      res.status(404).send("You are not Authorized to Access this!");
    }
  } else {
    res.status(404).send("You are not Authorized to Access this!");
  }
};

module.exports = AuthorizationMiddleware;