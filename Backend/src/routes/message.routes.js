import express from 'express';

const router = express.Router();

router.get("/send",(req,res)=>{
    res.send("Message API")
})
export default router;