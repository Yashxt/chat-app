import express from 'express';
import{login,signup,logout,updateProfile } from  '../controller/auth.controller.js';
import {protectedRoute} from '../middleware/authMiddleware.js'


let router = express.Router();
router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.put("/update-profile",protectedRoute,updateProfile)
router.get("/check", protectedRoute, (req, res) => res.status(200).json(req.user));
export default router;  