import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

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
    // Populate thêm thông tin từ TravelerID và TourID
    const bookings = await Booking.find()
      .populate('TravelerID', 'FirstName LastName') // Chỉ lấy FirstName và LastName từ Traveler
      .populate('TourID', 'TourName') // Chỉ lấy TourName từ Tour
      .exec();

    // Tạo dữ liệu với các trường được gộp
    const transformedBookings = bookings.map(booking => ({
      _id: booking._id,
      Name: `${booking.TravelerID?.FirstName || ''} ${booking.TravelerID?.LastName || ''}`.trim(),
      TourName: booking.TourID?.TourName || '',
      ...booking._doc, // Sao chép các trường khác
    }));

    res.status(200).json({
      success: true,
      data: transformedBookings,
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

export const getUserUnpaidBookings = async (req, res) => {
  try {
      // Lấy TravelerID từ request params hoặc query string
      const { TravelerID } = req.params;

      // Tìm tất cả các booking của traveler với trạng thái 'Pending'
      const unpaidBookings = await Booking.find({
          TravelerID: TravelerID,
          BookingStatus: 'Pending',
      }).populate('TourID'); // Populate thông tin tour từ collection Tour

      if (!unpaidBookings || unpaidBookings.length === 0) {
          return res.status(404).json({ message: 'No unpaid bookings found for this traveler' });
      }

      // Tạo một mảng kết quả để gửi lại
      const result = unpaidBookings.map(booking => {
          const tour = booking.TourID; // Dữ liệu tour đã được populate vào booking

          return {

            BookingID: booking._id,
            TourID: tour._id,
            LanguageOffers: tour.LanguageOffers,
            BookingDate: booking.BookingDate,
            BookingStatus: booking.BookingStatus,
            TotalPrice: booking.TotalPrice,
            TourName: tour.TourName,
            TourStatus: tour.TourStatus,
            StartDate: tour.StartDate,
            EndDate: tour.EndDate,
            AvailableSeats: tour.AvailableSeats,
            Locations: tour.Locations, // Gộp các địa điểm thành một chuỗi
            Price: tour.Price, //
            PaymentID: booking.PaymentID,
          };
      });

      // Trả về kết quả cho người dùng
      res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching unpaid bookings' });
  }
};

export const getUserPaidBookings = async (req, res) => {
  try {
      // Lấy TravelerID từ request params hoặc query string
      const { TravelerID } = req.params;
    
      // Tìm tất cả các booking của traveler với trạng thái 'Pending'
      const paidBookings = await Booking.find({
          TravelerID: TravelerID,
          BookingStatus: { $in: ['Confirmed', 'Cancelled'] },
      }).populate('TourID'); // Populate thông tin tour từ collection Tour

      if (!paidBookings || paidBookings.length === 0) {
          return res.status(404).json({ message: 'No paid bookings found for this traveler' });
      }

      // Tạo một mảng kết quả để gửi lại
      const result = paidBookings.map(booking => {
          const tour = booking.TourID; // Dữ liệu tour đã được populate vào booking

          return {
           
            BookingID: booking._id,
            TourID: tour._id,
            LanguageOffers: tour.LanguageOffers,
            BookingDate: booking.BookingDate,
            BookingStatus: booking.BookingStatus,
            TotalPrice: booking.TotalPrice,
            TourName: tour.TourName,
            TourStatus: tour.TourStatus,
            StartDate: tour.StartDate,
            EndDate: tour.EndDate,
            AvailableSeats: tour.AvailableSeats,
            Locations: tour.Locations, // Gộp các địa điểm thành một chuỗi
            Price: tour.Price, 
            PaymentID: booking.PaymentID,
          };
      });

      // Trả về kết quả cho người dùng
      res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching paid bookings' });
  }
};

// Hủy booking
export const cancelBooking = async (req, res) => {
  try {
    // Lấy ID của booking từ tham số URL hoặc body
    const id = req.params.id

    // Tìm booking trong cơ sở dữ liệu
    const booking = await Booking.findById(id);

    // Kiểm tra nếu không tìm thấy booking
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Kiểm tra nếu trạng thái không phải là confirmed
    if (booking.BookingStatus !== 'Confirmed') {
      return res.status(400).json({ message: "Booking is not in confirmed status" });
    }

    // Thay đổi trạng thái của booking
    booking.BookingStatus = 'Cancelled';
    await booking.save();

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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


