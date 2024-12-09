import React, { useState } from "react";
import "./OperatorReports.css";
import OperatorHeader from "../../Components/Headers/OperatorHeader/OperatorHeader";
import OperatorSearchBar from "../../shared/Searched-bar/reports-searched-bar";
import bookingData from "../../assets/data/booking";
import paymentData from "../../assets/data/payment";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const Reports = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5; // Số lượng items mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const viewBooking = (bookingId) => {
    navigate(`/view-booking/${bookingId}`); // Navigate with the booking ID
  };
  // Calculate total pages
  // const totalPages = Math.ceil(reports.length / itemsPerPage);

  // Gọi API bằng useFetch
  const { data: reports, loading, error } = useFetch(`${BASE_URL}/bookings`);

  // Tính toán số trang
  const totalPages = reports ? Math.ceil(reports.length / itemsPerPage) : 0;

  // Lấy dữ liệu của trang hiện tại
  const currentData = reports
    ? reports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                <th>Traveler</th>
                <th>Tour</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((report, index) => (
                <tr key={index}>
                  <td>{report._id}</td>
                  <td>{report.Name || "N/A"}</td>
                  <td>{report.TourName|| "N/A"}</td>
                  <td>{report.BookingStatus || "N/A"}</td>
                  <td>{new Date(report.BookingDate).toLocaleDateString()}</td>
                  <td>
                    <i
                      className="fa-solid fa-circle-info"
                      onClick={() => viewBooking(report._id)}
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
