import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    BookingStatus: {
        type: String,
        enum: {
            values: ['Confirmed', 'Pending', 'Cancelled','In Progress'],
            message: '{VALUE} is not a valid booking status.'
        },
        default: 'Pending' // Mặc định là Pending khi tạo booking
    },
    BookingDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là thời điểm tạo booking
    },
    TotalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    TravelerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến User collection
        required: true
    },
    TourID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour', // Tham chiếu đến Tour collection
        required: true
    },
    PaymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Tham chiếu đến Payment collection
        default: null
    },
    RefundID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refund', // Tham chiếu đến Refund collection
        default: null
    }
},
{ timestamps: true });

export default mongoose.model("Booking", bookingSchema);
