import express from 'express';
import{login,signup } from  '../controller/auth.controller.js';



let router = express.Router();
router.get("/login",login)
router.post("/signup",signup)
router.get("/logout",(req,res)=>{
    res.send("Logout API")
})
export default router;  