//const express = require('express')// method-1
import express from "express"; //method-2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
dotenv.config({});

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("api/v1/user", userRoute);
app.use("api/v1/message", messageRoute);
//http://localhost:8000/api/v1/user/register

app.listen(PORT, () => {
  connectDB();
  console.log(`server listen at port ${PORT}`);
});

