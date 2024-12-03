import React from "react";
import "./ViewBooking.css";

const ViewBookingRefund = () => {
  return (
    <div className="container">
      
      <main className="main-content">
        <h1 className="title">Booking ID: B1001</h1>
        <div className="tabs">
          <button className="tab">Payment</button>
          <button className="tab active">Refund</button>
        </div>
        <section className="booking-details">
          <div className="info">
            <p><strong>Booking ID:</strong> B1001</p>
            <p><strong>Payment ID:</strong> P1001</p>
            <p><strong>Refund ID:</strong> R1001</p>
            <p><strong>Username:</strong> levanc</p>
            <p><strong>First name:</strong> Le</p>
            <p><strong>Last name:</strong> Van C</p>
            <p><strong>Phone:</strong> +84987654323</p>
            <p><strong>Email:</strong> levanc@example.com</p>
          </div>
          <div className="trip-info">
            <h2>Discover Vietnam</h2>
            <p><strong>From:</strong> 01/03/2024</p>
            <p><strong>To:</strong> 10/03/2024</p>
            <p><strong>Locations:</strong> Hà Nội › Huế › Đà Nẵng › TP. Hồ Chí Minh</p>
            <p><strong>Languages offers:</strong> English, Vietnamese, French</p>
            <p><strong>Cancellation policy:</strong> Full refund up to 7 days before the start date.</p>
            <p className="availability">Available</p>
          </div>
          <div className="total-payment">
            <p>TOTAL REFUND: <span>6.900.000 VND</span></p>
          </div>
        </section>
        <section className="transfer-details">
          <h2>Transfer to</h2>
          <p><strong>Bank:</strong> NGUYEN VAN A</p>
          <p><strong>Account number:</strong> 123456789</p>
          <p><strong>Account name:</strong> NGUYEN VAN A</p>
        </section>
        <div className="actions">
          <button className="approve-btn">Approve</button>
          <button className="disapprove-btn">Disapprove</button>
        </div>
      </main>
    </div>
  );
};

export default ViewBookingRefund;
