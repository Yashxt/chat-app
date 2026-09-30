import { generateToken } from '../libs/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
// import "dotenv/config"
import {ENV} from "../libs/env.js"
import { sendVerificationEmail } from '../libs/resend.js';
import {protectedRoute} from "../middleware/authMiddleware.js"
import cloudinary from '../libs/cloudinary.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).send("all fields are required");
    }

    if (password.length < 6) {
      return res.status(400).send("password is less than 6 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    generateToken(savedUser._id, res);

    try {
      await sendVerificationEmail(
        savedUser.email,
        savedUser.fullName,
        ENV.CLIENT_URL
      );
    } catch (error) {
      console.log("Email failed:", error.message);
    }

    return res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      profile: savedUser.profile,
    });

  } catch (error) {
    console.log("error in signup controller", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const {email,password}  = req.body;
    if(!email|| !password){
        return res.status(400).send("all fields are required")
    }
  try{
     const user = await User.findOne({email})
     if(!user){
        return res.status(400).send("invalid credentials")
     }
     const ispasswordCorrect = await bcrypt.compare(password,user.password);
  
  if(!ispasswordCorrect){
    return res.status(400).send("invalid credentials")
  }
  generateToken(user._id,res);
  return res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profile: user.profile,
  });
  } catch(error){
    console.error("Error in login controller:", error);   
    return res.status(500).json({ message: "Server error" });
   }
}
export const logout =async(_,res)=>{
   res.cookie("jwt","",{maxAge:0})
   return res.status(200).json({ message: "Logged out successfully" });
}


export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};