import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';
import path from 'path';
import { connectDB } from './libs/db.js';
import { Env } from './libs/env.js';
const app = express();
const _dirname = path.resolve();
const PORT = Env.PORT || 8000;
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);
if(Env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../Frontend/dist/index.html"));
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
     connectDB();
});