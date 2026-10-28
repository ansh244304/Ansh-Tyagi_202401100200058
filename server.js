import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./routes/bookroutes.js"
dotenv.config();
const app=express();
app.use(express.json());
const PORT=process.env.PORT || 5000;


connectDB();
app.use("/api/book",router);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

