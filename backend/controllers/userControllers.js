const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")
const bcrypt = require('bcryptjs')
const registerUser = asyncHandler(async(req,res)=>{
     const {name,email,password}=req.body
     if (!name||!email||!password) {
        res.status(400)
        throw new Error("Please enter all the fields")
        
     }
     const userExists=await User.findOne({email})
     if (userExists) {
        res.sendStatus(400)
        throw new Error("User already exists")
     }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
     const user = await User.create({
        name,
        email,
        password:secPass,
        
     })
     if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,

          token: generateToken(user._id),
        });        
     }else{
        res.status(400)
        throw new Error("Failed to create the user")
     }
})
const authUser = asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   const user = await User.findOne({email})
   if (user&&(await user.matchPassword(password))) {
      res.json({
        _id: user._id,     
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
      
   }else{
      res.status(400);
      throw new Error("Invalid id or password");
   }
})
const allchats = asyncHandler(async(req,res)=>{
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id:  {$ne:req.user._id } });
  res.send(users);
   
})
module.exports = {registerUser,authUser,allchats}