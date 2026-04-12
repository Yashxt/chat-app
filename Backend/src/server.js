import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';
import path from 'path';
dotenv.config();
const app = express();
const _dirname = path.resolve();
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../Frontend/dist/index.html"));
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});