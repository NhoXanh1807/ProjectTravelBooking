import React, { useState, useEffect } from 'react';
import './Refund.css';
import TravelerHeader from "../../Components/Headers/TravelerHeader/TravelerHeader";
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import Tourbarfive from '../../shared/mostsearched/tourbar_five';
import { useLocation } from 'react-router-dom';
import bookingData from '../../assets/data/booking';
import tourData from '../../assets/data/tour';
import paymentData from '../../assets/data/payment'
const RefundPage = () => {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  // Get the location state
  const location = useLocation();
  const { booking, tour } = location.state || {};  // Ensure state is available

  return (
    <div className="refund-page">
      <BookingHeader />
      <div className="refund-page-content">
        <div className="refund-page-content-header">REFUND</div>
        <div className="details">
          <div className='bid'>
          <div>Booking ID: </div>
          <div className="details-bid">{booking ? booking._id : 'N/A'}</div>
          </div>
          <div className='pid'>
          <div>Payment ID:</div>
          <div className="details-pid">{booking ? booking.PaymentID : 'N/A'}</div>
          </div>
          {/* <p><strong>Refund Date:</strong> {refundDate}</p> */}
        </div>
        <div className='refund-page-content-card'>
          <Tourbarfive item={tour} booking={booking} />
        </div>
        <div className="total-payment">
          <div className="total-payment-content">TOTAL REFUND:</div> 
          <div className='total-payment-price'>{new Intl.NumberFormat('vi-VN').format(tour.Price)} VND</div>
        </div>

        <div className="transfer-section">
          <h2>Transfer to</h2>
          <div className="form-group">
            <label>Bank:</label>
            <input
              type="text"
              placeholder="Enter bank name"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Account number:</label>
            <input
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="refund-page-content-btn">
          <button>Confirm</button>
        </div>

      </div>
    </div>
  );
};

export default RefundPage;
