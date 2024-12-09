import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

// Tạo mới thanh toán
export const createPayment = async (req, res) => {
    const newPayment = new Payment(req.body);

    try {
        // Kiểm tra Booking có tồn tại không
        const bookingExists = await Booking.findById(newPayment.BookingID);
        if (!bookingExists) {
            return res.status(404).json({ success: false, message: "Booking không tồn tại!" });
        }

        // Lưu Payment
        const savedPayment = await newPayment.save();
        res.status(201).json({ success: true, data: savedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Không thể tạo Payment.", error: err.message });
    }
};

// Lấy thông tin thanh toán theo ID
export const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findById(id).populate('BookingID').populate('RefundID');
        if (!payment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Payment." });
        }

        res.status(200).json({ success: true, data: payment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy Payment.", error: err.message });
    }
};

// Cập nhật thông tin thanh toán
export const updatePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Payment để cập nhật." });
        }

        res.status(200).json({ success: true, data: updatedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật Payment.", error: err.message });
    }
};

// Xóa thanh toán
export const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Payment để xóa." });
        }

        res.status(200).json({ success: true, message: "Đã xóa Payment thành công." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa Payment.", error: err.message });
    }
};

// Lấy tất cả thanh toán
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('BookingID').populate('RefundID');
        res.status(200).json({ success: true, data: payments });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách Payment.", error: err.message });
    }
};

export const getPaymentByBookingId = async (req, res) => {
    const { BookingID } = req.params;

    try {
        const payment = await Payment.findOne({ BookingID }).populate('BookingID');
        if (!payment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy Payment theo BookingID." });
        }

        res.status(200).json({ success: true, data: payment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy Payment theo BookingID.", error: err.message });
    }
};