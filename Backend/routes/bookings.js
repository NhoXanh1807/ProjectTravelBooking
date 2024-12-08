import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserUnpaidBookings,
  cancelBooking,
  updateBookingStatus,
  getUserPaidBookings,
} from '../Controllers/BookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Tạo booking (yêu cầu người dùng đăng nhập)
router.post('/', verifyUser, createBooking);

// Lấy danh sách tất cả booking (chỉ admin có quyền)
router.get('/',  getAllBookings);

// Lấy danh sách booking của một người dùng (yêu cầu người dùng đăng nhập)
router.get('/user/unpaid/:TravelerID', getUserUnpaidBookings);
router.get('/user/paid/:TravelerID', getUserPaidBookings);
// Hủy booking (yêu cầu người dùng đăng nhập)
router.put('/cancel/:id', cancelBooking);

// Cập nhật trạng thái booking (chỉ admin có quyền)
router.patch('/:bookingId',  updateBookingStatus);

export default router;
