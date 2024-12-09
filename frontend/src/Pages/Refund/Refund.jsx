import React, { useState } from 'react';
import './Refund.css';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import Tourbarfive from '../../shared/mostsearched/tourbar_five';
import { useLocation, useNavigate } from 'react-router-dom';

const RefundPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi xác nhận
  const { tour } = location.state || {}; // Ensure state is available

  const [isRefunded, setIsRefunded] = useState(false);

  if (!tour) {
    return <div>Error: Missing tour details!</div>;
  }

  const handleConfirm = () => {
    // Set trạng thái đã hoàn thành refund
    setIsRefunded(true);

    // Sau 2 giây, chuyển hướng người dùng về trang "Home"
    setTimeout(() => {
      navigate('/home');
    }, 2000);
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
              <button onClick={handleConfirm}>Confirm</button>
            </div>
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
