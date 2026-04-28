import { generateToken } from '../libs/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
// import "dotenv/config"
import {Env} from "../libs/env.js"
import { sendVerificationEmail } from '../libs/resend.js';

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
        Env.CLIENT_URL
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
    
}