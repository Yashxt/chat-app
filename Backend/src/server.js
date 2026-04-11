import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});