import Refund from '../models/Refund.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

// Tạo yêu cầu hoàn tiền
export const createRefund = async (req, res) => {
    const newRefund = new Refund(req.body);

    try {
        // Kiểm tra Booking và Payment có tồn tại không
        const bookingExists = await Booking.findById(newRefund.BookingID);
        if (!bookingExists) {
            return res.status(404).json({ success: false, message: "Booking không tồn tại!" });
        }

        const paymentExists = await Payment.findById(newRefund.PaymentID);
        if (!paymentExists) {
            return res.status(404).json({ success: false, message: "Payment không tồn tại!" });
        }

        // Lưu Refund
        const savedRefund = await newRefund.save();
        res.status(201).json({ success: true, data: savedRefund });
    } catch (err) {
        res.status(500).json({ success: false, message: "Không thể tạo Refund.", error: err.message });
    }
};

// Lấy thông tin Refund theo ID
export const getRefundById = async (req, res) => {
    const { id } = req.params;

    try {
        const refund = await Refund.findById(id).populate('BookingID').populate('PaymentID');
        if (!refund) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Refund." });
        }

        res.status(200).json({ success: true, data: refund });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy Refund.", error: err.message });
    }
};

// Cập nhật trạng thái Refund
export const updateRefundStatus = async (req, res) => {
    const { id } = req.params;
    const { RefundStatus, ProcessedDate } = req.body;

    try {
        const updatedRefund = await Refund.findByIdAndUpdate(
            id,
            { $set: { RefundStatus, ProcessedDate } },
            { new: true }
        );

        if (!updatedRefund) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Refund để cập nhật." });
        }

        res.status(200).json({ success: true, data: updatedRefund });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật Refund.", error: err.message });
    }
};

// Lấy tất cả Refunds
export const getAllRefunds = async (req, res) => {
    try {
        const refunds = await Refund.find().populate('BookingID').populate('PaymentID');
        res.status(200).json({ success: true, data: refunds });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách Refunds.", error: err.message });
    }
};
