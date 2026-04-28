import {Resend} from "resend"
// //import 'dotenv/config'
// import dotev from "dotenv"  //same as above but with more control over when to load the env variables   
// dotev.config()
import { Env } from "../libs/env.js";
export const resendClient =  new Resend(Env.RESEND_API_KEY)

export const sender = {
    email:Env.EMAIL_FROM,
    name:Env.EMAIL_FROM_NAME
}