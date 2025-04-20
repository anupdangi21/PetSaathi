// Server.js
import express from 'express';
import cors from 'cors';
import path from "path";
import http from 'http';
import { Server } from 'socket.io';
import mongoose from './Connection.js';
import authRoutes from './Route/authRoute.js';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import userRouter from './Route/userRoutes.js';
import { configureSocket } from './Socket/chatSocket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Configure Socket.io
configureSocket(io);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes and static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(authRoutes);
app.use('/user', userRouter);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));