import express from 'express';
import dotenv from 'dotenv';
import cors from "cors" ;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/bookings.js";
import paymentRoute from './routes/payments.js';

dotenv.config();
const app =express();
const port = process .env.PORT || 8000
const corsOptions = {
    origin:true,
    credentials:true,
}
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth",authRoute);
app.use('/api/v1/tours',tourRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/bookings",bookingRoute);
app.use('/api/v1/payments', paymentRoute);
app.listen(port, () => {
    connect();
    console.log("Server is running on port" , port);
  });