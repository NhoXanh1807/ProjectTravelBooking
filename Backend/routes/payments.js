import express from 'express';
import {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPayments,
    getPaymentByBookingId
} from '../Controllers/PaymentController.js';

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.get('/booking/:BookingID', getPaymentByBookingId);
// Tạo mới Payment (Chỉ Admin)
router.post("/", verifyAdmin, createPayment);

// Lấy thông tin Payment theo ID
router.get("/:id", verifyUser, getPaymentById);

// Lấy tất cả Payments (Admin)
router.get("/", verifyAdmin, getAllPayments);

// Cập nhật Payment (Admin)
router.put("/:id", verifyAdmin, updatePayment);

// Xóa Payment (Admin)
router.delete("/:id", verifyAdmin, deletePayment);

export default router;
