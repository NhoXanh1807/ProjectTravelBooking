import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    PaymentMethod: {
        type: String,
        enum: {
            values: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'],
            message: '{VALUE} is not a valid payment method.'
        },
        required: true
    },
    PaymentStatus: {
        type: String,
        enum: {
            values: ['Success', 'Pending', 'Failed'],
            message: '{VALUE} is not a valid payment status.'
        },
        default: 'Pending' // Mặc định là Pending khi tạo Payment
    },
    PaymentAmount: {
        type: Number,
        required: true,
        min: 0 // Không thể thanh toán số tiền âm
    },
    PaymentDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là thời điểm tạo Payment
    },
    BookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Tham chiếu đến Booking collection
        required: true
    },
    RefundID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refund', // Tham chiếu đến Refund collection nếu có hoàn tiền
        default: null
    },
    EvidenceImage: {
        type: String, // URL của hình ảnh bằng chứng thanh toán
        default: null // Giá trị mặc định là null nếu không có hình ảnh
    }
}, 
{ timestamps: true });

export default mongoose.model('Payment', paymentSchema);
