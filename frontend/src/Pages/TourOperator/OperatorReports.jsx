import React, { useState } from "react";
import "./OperatorReports.css";
import OperatorHeader from "../../Components/Headers/OperatorHeader/OperatorHeader";
import OperatorSearchBar from "../../shared/Searched-bar/reports-searched-bar";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const reports = [
    { bookingId: 'B1001', paymentId: 'P1001', paymentStatus: 'Cancelled', paymentDate: '13/02/2024', refundId: 'R1001', refundStatus: 'In Process', refundDate: 'NULL' },
    { bookingId: 'B1002', paymentId: 'P1002', paymentStatus: 'Completed', paymentDate: '14/02/2024', refundId: 'R1002', refundStatus: 'Completed', refundDate: '15/02/2024' },
    { bookingId: 'B1003', paymentId: 'P1003', paymentStatus: 'Pending', paymentDate: '15/02/2024', refundId: 'R1003', refundStatus: 'NULL', refundDate: 'NULL' },
    { bookingId: 'B1004', paymentId: 'P1004', paymentStatus: 'Completed', paymentDate: '16/02/2024', refundId: 'R1004', refundStatus: 'NULL', refundDate: 'NULL' },
    { bookingId: 'B1005', paymentId: 'P1005', paymentStatus: 'Cancelled', paymentDate: '17/02/2024', refundId: 'R1005', refundStatus: 'In Process', refundDate: 'NULL' },
    { bookingId: 'B1006', paymentId: 'P1006', paymentStatus: 'Completed', paymentDate: '18/02/2024', refundId: 'R1006', refundStatus: 'Completed', refundDate: '19/02/2024' },
    { bookingId: 'B1007', paymentId: 'P1007', paymentStatus: 'Pending', paymentDate: '19/02/2024', refundId: 'R1007', refundStatus: 'NULL', refundDate: 'NULL' },
    { bookingId: 'B1008', paymentId: 'P1008', paymentStatus: 'Cancelled', paymentDate: '20/02/2024', refundId: 'R1008', refundStatus: 'In Process', refundDate: 'NULL' },
    { bookingId: 'B1009', paymentId: 'P1009', paymentStatus: 'Completed', paymentDate: '21/02/2024', refundId: 'R1009', refundStatus: 'Completed', refundDate: '22/02/2024' },
    { bookingId: 'B1010', paymentId: 'P1010', paymentStatus: 'Completed', paymentDate: '22/02/2024', refundId: 'R1010', refundStatus: 'NULL', refundDate: 'NULL' },
  ];
  
  const navigate = useNavigate();

  const itemsPerPage = 5; // Limit per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  // Get the data for the current page
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

  const viewBooking = (bookingId) => {
    navigate(`/booking/${bookingId}`, { state: { bookingId: bookingId } });
  }

  return (
    <>
      <OperatorHeader />
      <div className="OperatorReports">
        <h1>All reports</h1>
        <div className="container">
          <OperatorSearchBar />
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Payment ID</th>
                <th>Payment Status</th>
                <th>Payment Date</th>
                <th>Refund ID</th>
                <th>Refund Status</th>
                <th>Refund Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((report, index) => (
                <tr key={index}>
                  <td>{report.bookingId}</td>
                  <td>{report.paymentId}</td>
                  <td>{report.paymentStatus}</td>
                  <td>{report.paymentDate}</td>
                  <td>{report.refundId}</td>
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

          {/* Pagination Controls */}
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
                className={`pagination-button ${
                  currentPage === pageIndex + 1 ? "active" : ""
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
    </>
  );
};

export default Reports;
