import jwt from "jsonwebtoken"
import {Env} from "./env.js"
export const generateToken =  (userId,res)=>{
    const {JWT_SECRET} = Env;
  if(!JWT_SECRET)  {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
const token = jwt.sign({userId},JWT_SECRET,{
     expiresIn:"7d"
})
res.cookie("jwt",token,{
    httpOnly:true, // prevent xss attacks 
    maxAge:7*24*60*60*1000,
    sameSite:"strict", //csrf attacks prevent
    secure:Env.NODE_ENV === "development" ?false :true
})
return token;
}