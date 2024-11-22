import express from 'express';
import dotenv from 'dotenv';
import cors from "cors" ;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js'
dotenv.config();
const app =express();
const port = process .env.PORT || 8000
//database
mongoose.set("strictQuery",false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connection success" );
    } catch (err) {
        console.log("MongoDB connection failed" );
    }
};
app.get('/', (req, res) => {
    res.send('Bạn sẽ không bao giờ thấy dòng này!');
});
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/tours',tourRoute);
app.listen(port, () => {
    connect();
    console.log("Server is running on port" , port);
  });