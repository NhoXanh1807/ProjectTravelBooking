import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import Tourbarfive from '../../shared/mostsearched/tourbar_five';
import paymentData from '../../assets/data/payment';

const PaymentPage = () => {
    const location = useLocation();
    const { booking, tour } = location.state || {};

    console.log("Booking object:", booking);

    const operator = { bank: 'Vietcombank', accountNumber: '123456789', accountName: 'Nguyen Van A' };
    const bankImageUrl = "https://vcb-livechat.fpt.ai/v36/src/img/vcb-logo.png";

    const [image, setImage] = useState(null);

    // Find the payment record corresponding to the current booking
    const paymentRecord = paymentData.find((payment) => payment.BookingID === booking?._id);
    console.log("Payment record:", paymentRecord);

    // Extract and format PaymentDate
    const paymentDate = paymentRecord
        ? new Date(paymentRecord.PaymentDate).toLocaleDateString('en-GB')
        : "Not set";
    console.log("Payment Date:", paymentRecord?.PaymentDate);
    console.log("Type of PaymentDate:", typeof paymentRecord?.PaymentDate);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    if (!booking || !tour) {
        return <div>Error: Missing booking or tour details!</div>;
    }

    return (
        <div className="payment-page">
            <BookingHeader />
            <div className="payment-page-content-header">PAYMENT</div>
            <div className="details">
                <div className='bid'>
                    <div className="details-content">Booking ID:</div>
                    <div className="details-bid">{booking._id}</div>
                </div>
                <div className='bid'>
                    <div className="details-content">Payment ID:</div>
                    <div className="details-bid">{paymentRecord ? paymentRecord._id : "Not available"}</div>
                </div>
                <div className='bid'>
                    <div className="details-content">Payment Date:</div>
                    <div className="details-bid">{paymentDate}</div>
                </div>
            </div>

            <div className="tour-card">
                <Tourbarfive item={tour} booking={booking} />
            </div>

            <div className="total-payment">
                TOTAL PAYMENT: {new Intl.NumberFormat('vi-VN').format(tour.Price)} VND
            </div>

            <div className="transfer-to">
                <h2>Transfer to</h2>
                <div className="operator-details">
                    <div>
                        <p><strong>Bank:</strong> {operator.bank}</p>
                        <p><strong>Account number:</strong> {operator.accountNumber}</p>
                        <p><strong>Account name:</strong> {operator.accountName}</p>
                    </div>
                    <div className="bank-image-container">
                        <img src={bankImageUrl} alt="Bank Logo" className="bank-image" />
                    </div>
                </div>
            </div>

            <div className="upload-section">
                <h2>Upload money transfer form</h2>
                <div
                    className="upload-box"
                    onClick={() => document.getElementById('upload-input').click()}
                >
                    {image ? (
                        <img src={image} alt="Uploaded" className="uploaded-image" />
                    ) : (
                        <p>Click to upload</p>
                    )}
                </div>
                <input
                    type="file"
                    id="upload-input"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="payment-page-btn">
            <button className="confirm-button">Confirm</button>
            </div>
            
        </div>
    );
};

export default PaymentPage;
