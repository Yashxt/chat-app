import {Resend} from "resend"
// //import 'dotenv/config'
// import dotev from "dotenv"  //same as above but with more control over when to load the env variables   
// dotev.config()
import { ENV } from "../libs/env.js";
export const resendClient =  new Resend(ENV.RESEND_API_KEY)

export const sender = {
    email:ENV.EMAIL_FROM,
    name:ENV.EMAIL_FROM_NAME
}