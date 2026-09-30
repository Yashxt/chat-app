import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
import  cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';
import path from 'path';
import cors from 'cors';
import { connectDB } from './libs/db.js';
import { ENV } from './libs/env.js';
const app = express();
const _dirname = path.resolve();
const PORT = ENV.PORT || 8000;
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:ENV.CLIENT_URL ,Credential:true}));
app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);
if(ENV.NODE_ENV === "development"){
    app.use(express.static(path.join(_dirname, "../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../Frontend/dist/index.html"));
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
     connectDB();
});