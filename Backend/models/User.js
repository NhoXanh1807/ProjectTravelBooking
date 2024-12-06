import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Phone: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "traveler"
    },
    // Các chi tiết đặc biệt cho từng loại người dùng
   
    
}, 
{timestamps: true});

export default mongoose.model("User", userSchema);
