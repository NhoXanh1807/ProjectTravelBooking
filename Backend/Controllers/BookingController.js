import Booking from '../models/Booking.js';

// Tạo booking mới
export const createBooking = async (req, res) => {
  try {
    const { BookingStatus,TravelerID, TourID, TotalPrice, PaymentID } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!TravelerID || !TourID || !TotalPrice) {
      return res.status(400).json({ message: 'Missing required fields!' });
    }

    // Tạo booking mới
    const booking = await Booking.create({
      BookingStatus,
      TravelerID,
      TourID,
      TotalPrice,
      PaymentID: PaymentID || null, // Nếu không có PaymentID, mặc định là null
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking!',
      error: err.message,
    });
  }
};

// Lấy danh sách tất cả booking (chỉ dành cho admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('TravelerID', 'name email') // Populate thêm thông tin user
      .populate('TourID', 'name location') // Populate thêm thông tin tour
      .exec();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings!',
      error: err.message,
    });
  }
};

// Lấy danh sách booking của 1 user
export const getUserBookings = async (req, res) => {
  try {
    const { TravelerID } = req.params;

    const bookings = await Booking.find({ TravelerID })
      .populate('TourID', 'name location') // Populate thêm thông tin tour
      .exec();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user bookings!',
      error: err.message,
    });
  }
};

// Hủy booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found!' });
    }

    // Cập nhật trạng thái booking thành "Cancelled"
    booking.BookingStatus = 'Cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully!',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking!',
      error: err.message,
    });
  }
};

// Cập nhật trạng thái booking
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Kiểm tra giá trị hợp lệ
    if (!['Confirmed', 'Pending', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid booking status!' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found!' });
    }

    // Cập nhật trạng thái
    booking.BookingStatus = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully!',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status!',
      error: err.message,
    });
  }
};


