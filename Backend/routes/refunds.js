import express from 'express';
import {
    createRefund,
    getRefundById,
    updateRefundStatus,
    getAllRefunds
} from '../controllers/RefundController.js';

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Tạo yêu cầu Refund (Chỉ User)
router.post("/", verifyUser, createRefund);

// Lấy thông tin Refund theo ID
router.get("/:id", verifyUser, getRefundById);

// Lấy tất cả Refunds (Admin)
router.get("/", verifyAdmin, getAllRefunds);

// Cập nhật trạng thái Refund (Admin)
router.patch("/:id", verifyAdmin, updateRefundStatus);

export default router;
