// packages
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

// utils
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.listen(port, () => console.log(`Server running on port ${port}`));
