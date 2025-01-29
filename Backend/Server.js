import express from 'express';
import cors from 'cors';
import path from "path";

import mongoose from'./Connection.js'; 
import authRoutes from './Route/authRoute.js'; 
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import userRouter from './Route/userRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies (if needed)
  }));


// Use the routes from authController.js
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(authRoutes);
app.use('/user',userRouter)

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
