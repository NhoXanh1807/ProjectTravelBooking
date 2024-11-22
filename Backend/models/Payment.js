import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    PaymentID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    PaymentDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là ngày giờ hiện tại
    },
    PaymentAmount: {
        type: Number,
        required: true,
        min: 0 // Số tiền thanh toán không được âm
    },
    PaymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'], // Các phương thức thanh toán hợp lệ
    },
    PaymentStatus: {
        type: String,
        enum: {
            values: ['Completed', 'Pending', 'Failed'],
            message: '{VALUE} is not a valid payment status.'
        },
        default: 'Pending' // Mặc định là Pending khi tạo payment
    },
    BookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Tham chiếu đến Booking collection
        required: true
    },
    RefundID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refund', // Tham chiếu đến Refund collection
        default: null // Mặc định là null nếu không có hoàn tiền
    }
},
{ timestamps: true });

export default mongoose.model("Payment", paymentSchema);
