import express from 'express';
import{login,signup,logout,updateProfile } from  '../controller/auth.controller.js';
import {protectedRoute} from '../middleware/authMiddleware.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js';


let router = express.Router();
router.use(arcjetProtection)
router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.put("/update-profile",protectedRoute,updateProfile)
router.get("/check", protectedRoute, (req, res) => res.status(200).json(req.user));
// router.get("/test",arcjetProtection, (req, res) => {
//   res.status(200).json({ message: "Arcjet protection passed. You are not a bot." });
// });
export default router; 