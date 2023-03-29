
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");
const saltRounds = 10;

const Login = async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel.find({ email: email });

  if (user.length == 0) {
    return res.status(404).send("User not register");
  }

  let hash = user[0].password;

  //Comparing hash password with the entered one
  bcrypt.compare(password, hash, function (err, result) {
    if(err){
      return res.json({msg:err.message})
    }

    if (result) {
      return res.json({
        user:{
            name:user[0].name,
            email:user[0].email,
           gender:user[0].gender, 
           profile:user[0]?.profile,
           token: jwt.sign({ userId: user[0]._id }, "faisal")
        }
        ,
      });
    }
    return res.status(404).send("Incorrect password ");
  });
};

const Register = async (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      return res.status(400).send(err.message);
    }
    let newUser = new userModel({ ...req.body, password: hash });
    await newUser.save();
  });

  res.status(200).send("New User has been registered");
};

module.exports = {
  Login,
  Register,
};