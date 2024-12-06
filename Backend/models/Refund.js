import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema({
    RefundStatus: {
        type: String,
        enum: {
            values: ['Pending', 'Approved', 'Rejected'],
            message: '{VALUE} is not a valid refund status.'
        },
        default: 'Pending'
    },
    RefundAmount: {
        type: Number,
        required: true,
        min: 0
    },
    RequestDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    ProcessedDate: {
        type: Date
    },
    BookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    PaymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
}, 
{ timestamps: true });

export default mongoose.model('Refund', refundSchema);
