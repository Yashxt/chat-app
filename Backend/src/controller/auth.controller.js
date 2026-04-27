import { generateToken } from '../libs/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
export const login = (req,res)=>{
    
}


export const signup =async (req,res)=>{
    const { fullName,email,password } = req.body
    try{
    if(!fullName || !email ||!password){
        return res.status(400).send("all fields are required")
    }
    if(password.length <6){
        return res.status(400).send("passowrd is less than 6 character ")

    }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }  
    const user = await User.findOne({email})
    if(user){
        return res.status(400).send("user already exist")
    }
    const salt  =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
     const newUser = new User({
        fullName:fullName,
        email:email,
        password:hashedPassword
     })
     if(newUser){
       const savedUser =  await newUser.save()
        generateToken(savedUser._id,res)
        res.status(201).json({
            _id: newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profile:newUser.profile
        })
     }
     else{
        return res.status(400).send("invalid user data")
     }}
     catch(error){
        console.log("error in signup controller",error);
        res.status(500).json({ message: "Server error" })
     }
}