import mongoose from "mongoose";
import { Env } from "./env.js";
export const connectDB = async()=>{
    try {
      const conn =   await mongoose.connect(Env.MONGO_URL,{
    dbName: "chatify_db",
  });
        console.log("Connected to MongoDB",conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}