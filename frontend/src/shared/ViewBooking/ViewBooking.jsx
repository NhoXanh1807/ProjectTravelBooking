import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewBooking.css";

const ViewBooking = () => {
  const location = useLocation();
  const report = location.state; // Retrieve the passed data
  const navigate = useNavigate();

  if (!report) {
    return <div>No booking details available.</div>;
  }

  return (
    <div className="container">
      <main className="main-content">
        <div className="main-content-header">
        <h1 className="title">Booking ID: {report._id}</h1>
        <button className="main-content-header-btn"  onClick={() => navigate(-1)}><i class="fa-solid fa-xmark"></i></button>
        </div>
        

        <div className="booking-details">
          <div className="info">
            <div className="info-name">
              <div className="info-content">Traveler:</div>
              <div className="info-main">
              {report.TravelerID
                ? `${report.TravelerID.FirstName} ${report.TravelerID.LastName}`
                : "N/A"}
              </div>
            </div>
            <div className="info-tour">
              <div className="info-content">Tour:</div>
              <div className="info-main">{report.TourID ? report.TourID.TourName : "N/A"}</div>
            </div>
            <div className="info-status">
              <div className="info-content">Status:</div>
              <div className="info-main">{report.BookingStatus || "N/A"}</div>
            </div>
            <div className="info-date">
              <div className="info-content">Booking Date:</div>
              <div className="info-main">{new Date(report.BookingDate).toLocaleDateString()}</div>
            </div>
            <div className="info-price">
                <div className="info-content">Total Price:</div>
                <div className="info-main">${report.TotalPrice || "N/A"}</div>
            </div>
            <div className="info-payment">
              <div className="info-content">Payment ID:</div>
              <div className="info-main">{report.PaymentID || "N/A"}</div>
            </div>
            <div className="info-refund">
              <div className="info-content">Refund ID:</div>
              <div className="info-main">{report.RefundID || "N/A"}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewBooking;
