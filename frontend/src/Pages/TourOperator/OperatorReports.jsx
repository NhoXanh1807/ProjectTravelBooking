import React, { useState } from "react";
import "./OperatorReports.css";
import OperatorHeader from "../../Components/Headers/OperatorHeader/OperatorHeader";
import OperatorSearchBar from "../../shared/Searched-bar/reports-searched-bar";
import bookingData from "../../assets/data/booking";
import paymentData from "../../assets/data/payment";
import { useNavigate, Link } from "react-router-dom";
const Reports = () => {
  // Merge bookingData and paymentData
  const reports = bookingData.map((booking) => {
    const payment = booking._id === paymentData.BookingID ? paymentData : null;
    return {
      bookingId: booking._id, // Booking ID
      bookingStatus: booking.BookingStatus, // Booking Status
      bookingDate: booking.BookingDate.toISOString().slice(0, 10), // Booking Date
      paymentStatus: payment ? payment.PaymentStatus : "N/A", // Payment Status
      paymentDate: payment ? payment.PaymentDate.toISOString().slice(0, 10) : "N/A", // Payment Date
      refundStatus: booking.BookingStatus === "Cancelled" ? "In Process" : "Not Applicable", // Refund Status
      refundDate: booking.RefundDate ? booking.RefundDate.toISOString().slice(0, 10) : "N/A", // Refund Date
    };
  });

  const navigate = useNavigate();
  const itemsPerPage = 5; // Limit per page
  const [currentPage, setCurrentPage] = useState(1);
  const viewBooking = (bookingId) => {
    navigate(`/view-booking/${bookingId}`); // Navigate with the booking ID
  };
  // Calculate total pages
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  // Get current page data
  const currentData = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className="OperatorReports">
      <div className="OperatorReports-header">
        <OperatorHeader />
      </div>
      <div className="OperatorReports-name">All reports</div>
      <div className="OperatorReports-content">
        <OperatorSearchBar />
        <div className="OperatorReports-content-table">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Status</th>
                <th>Booking Date</th>
                <th>Payment Status</th>
                <th>Payment Date</th>
                <th>Refund Status</th>
                <th>Refund Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((report, index) => (
                <tr key={index}>
                  <td>{report.bookingId}</td>
                  <td>{report.bookingStatus}</td>
                  <td>{report.bookingDate}</td>
                  <td>{report.paymentStatus}</td>
                  <td>{report.paymentDate}</td>
                  <td>{report.refundStatus}</td>
                  <td>{report.refundDate}</td>
                  <td>
                    <i
                      className="fa-solid fa-circle-info"
                      onClick={() => viewBooking(report.bookingId)}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-button-notpage"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex + 1}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`pagination-button ${currentPage === pageIndex + 1 ? "active" : ""
                }`}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button-notpage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
