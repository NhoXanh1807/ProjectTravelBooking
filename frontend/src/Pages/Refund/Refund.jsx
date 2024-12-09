import React, { useState } from 'react';
import './Refund.css';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import Tourbarfive from '../../shared/mostsearched/tourbar_five';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
const RefundPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi xác nhận
  const { tour } = location.state || {}; // Ensure state is available

  const [isRefunded, setIsRefunded] = useState(false);
  const [loading, setLoading] = useState(false); // Trạng thái đang xử lý
  const [error, setError] = useState(null); // Lưu lỗi (nếu có)

  if (!tour) {
    return <div>Error: Missing tour details!</div>;
  }

  const handleConfirm = async () => {
    setLoading(true); // Bắt đầu loading
    setError(null); // Reset lỗi trước đó

    try {
      // Gửi request tới backend
      const response = await fetch(`${BASE_URL}/bookings/cancel/${tour.BookingID}`, {
        method: 'PUT', // Phương thức PUT để cập nhật
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Kiểm tra phản hồi từ server
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }

      const data = await response.json();
      alert('Booking cancelled successfully!');

      // Cập nhật UI
      setIsRefunded(true);

      // Sau 2 giây, chuyển hướng người dùng về trang "Home"
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError(error.message); // Cập nhật thông báo lỗi
    } finally {
      setLoading(false); // Dừng loading
    }
  };

  return (
    <div className="refund-page">
      <BookingHeader />
      <div className="refund-page-content">
        {!isRefunded ? (
          <>
            <div className="refund-page-content-header">REFUND</div>

            <div className="details">
              <div className="bid">
                <div>Tour Name:</div>
                <div className="details-bid">{tour.TourName}</div>
              </div>
              <div className="pid">
                <div>Tour ID:</div>
                <div className="details-pid">{tour.TourID}</div>
              </div>
            </div>

            <div className="refund-page-content-card">
              <Tourbarfive item={tour} />
            </div>

            <div className="total-payment">
              <div className="total-payment-content">TOTAL REFUND:</div>
              <div className="total-payment-price">
                {new Intl.NumberFormat('vi-VN').format(tour.Price)} VND
              </div>
            </div>

            <div className="refund-page-content-btn">
              <button onClick={handleConfirm} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
          </>
        ) : (
          <div className="refund-success">
            <h2>Successful Refund!</h2>
            <p>Your refund request has been successfully processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundPage;
