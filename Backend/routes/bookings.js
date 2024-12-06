import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
  updateBookingStatus,
} from '../Controllers/BookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Tạo booking (yêu cầu người dùng đăng nhập)
router.post('/', verifyUser, createBooking);

// Lấy danh sách tất cả booking (chỉ admin có quyền)
router.get('/', verifyAdmin, getAllBookings);

// Lấy danh sách booking của một người dùng (yêu cầu người dùng đăng nhập)
router.get('/user/:TravelerId', verifyUser, getUserBookings);

// Hủy booking (yêu cầu người dùng đăng nhập)
router.delete('/:bookingId', verifyUser, cancelBooking);

// Cập nhật trạng thái booking (chỉ admin có quyền)
router.patch('/:bookingId', verifyAdmin, updateBookingStatus);

export default router;
