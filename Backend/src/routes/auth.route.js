import express from 'express';

let router = express.Router();
router.get("/login",(req,res)=>{
    res.send("Login API")
})
router.get("/register",( req,res)=>{
    res.send("Register API")
})
router.get("/logout",(req,res)=>{
    res.send("Logout API")
})
export default router;  