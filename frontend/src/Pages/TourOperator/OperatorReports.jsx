import React from 'react';
import './OperatorReports.css';
import OperatorHeader from "../../Components/Headers/OperatorHeader/OperatorHeader"
import OperatorSearchBar from "../../shared/Searched-bar/reports-searched-bar";

const Reports = () => {
  const reports = [
    { bookingId: 'B1001', paymentId: 'P1001', paymentStatus: 'Cancelled', paymentDate: '13/02/2024', refundId: 'R1001', refundStatus: 'In Process', refundDate: 'NULL' },
    { bookingId: 'B1001', paymentId: 'P1001', paymentStatus: 'Cancelled', paymentDate: '13/02/2024', refundId: 'R1001', refundStatus: 'Completed', refundDate: '13/02/2024' },
    // Add more rows as necessary...
  ];

  return (
    <body>
      <OperatorHeader/>
      <div className="OperatorReports">
        <h1>All reports</h1>
        <div className="container">
          <OperatorSearchBar/>
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
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.bookingId}</td>
                  <td>{report.paymentId}</td>
                  <td>{report.paymentStatus}</td>
                  <td>{report.paymentDate}</td>
                  <td>{report.refundId}</td>
                  <td>{report.refundStatus}</td>
                  <td>{report.refundDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
};

export default Reports;