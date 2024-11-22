import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema({
    RefundID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    RefundAmount: {
        type: Number,
        required: true,
        min: 0 // Số tiền hoàn trả không được âm
    },
    RefundDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là ngày giờ hiện tại khi tạo refund
    },
    RefundMethod: {
        type: String,
        required: true,
        enum: ['PayPal', 'Bank Transfer', 'Credit Card'], // Các phương thức hoàn tiền hợp lệ
    },
    RefundStatus: {
        type: String,
        enum: {
            values: ['Completed', 'Pending', 'Failed'],
            message: '{VALUE} is not a valid refund status.'
        },
        default: 'Pending' // Mặc định là Pending khi tạo refund
    },
    BookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Tham chiếu đến Booking collection
        required: true
    },
    PaymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Tham chiếu đến Payment collection
        required: true
    }
},
{ timestamps: true });

export default mongoose.model("Refund", refundSchema);
