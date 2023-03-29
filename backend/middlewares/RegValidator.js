function RegValidator(req,res,next){
    const { name,gender, email, password } = req.body;

  if (!name || !gender || !email || !password) {
    return res.status(400).send("Enter all details first");
  }
   next()
}

module.exports=RegValidator