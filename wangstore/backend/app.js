// packages
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

// utils
import connectDB from './config/db.js';
import userRoutes from './routes/userRoues.js';
dotenv.config();

const port = 5000;
connectDB();

// const uri = process.env.MONGO_URI
console.log(process.env.PORT);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
