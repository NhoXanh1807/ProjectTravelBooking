import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import Tourbarfive from '../../shared/mostsearched/tourbar_five';
import { BASE_URL } from '../../utils/config';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Dùng để chuyển hướng sau khi xác nhận
    const { tour } = location.state || {};

    const operator = { bank: 'OCB', accountNumber: '123456789', accountName: 'Nguyen Ba Nhat Quang' };
    const bankImageUrl = "https://vcb-livechat.fpt.ai/v36/src/img/vcb-logo.png";

    const [image, setImage] = useState(null);
    const [isPaid, setIsPaid] = useState(false); // Trạng thái thanh toán thành công
    const [paymentRecord, setPaymentRecord] = useState(null); // Dữ liệu thanh toán
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lỗi khi fetch dữ liệu

    useEffect(() => {
        if (!tour) return;

        // Fetch thông tin thanh toán dựa trên BookingID
        const fetchPayment = async () => {
            try {
                const response = await fetch(`${BASE_URL}/payments/booking/${tour.BookingID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch payment data.");
                }
                const data = await response.json();
                setPaymentRecord(data.data); // Lưu dữ liệu thanh toán
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [tour]);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const updateBookingStatus = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/inprogress/${tour.BookingID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (!response.ok) {
                throw new Error('Failed to update booking status.');
            }

            const data = await response.json();
            console.log('Booking status updated:', data);
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleConfirm = async () => {
        setIsPaid(true); // Đặt trạng thái đã thanh toán
        await updateBookingStatus(); // Cập nhật trạng thái booking
        setTimeout(() => {
            navigate('/home'); // Chuyển hướng sau 2 giây
        }, 2000);
    };

    if (!tour) {
        return <div>Error: Missing tour details!</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="payment-page">
            <BookingHeader />
            {!isPaid ? (
                <>
                    <div className="payment-page-content-header">PAYMENT</div>
                    <div className="details">
                        <div className="bid">
                            <div className="details-content">Tour ID:</div>
                            <div className="details-bid">{tour.TourID}</div>
                        </div>
                        <div className="bid">
                            <div className="details-content">Payment ID:</div>
                            <div className="details-bid">{paymentRecord ? paymentRecord._id : "Not available"}</div>
                        </div>
                    </div>

                    <div className="tour-card">
                        <Tourbarfive item={tour} />
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
                        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                    </div>
                </>
            ) : (
                <div className="payment-success">
                    <h2>Successful Payment!</h2>
                    <p>Your payment has been successfully processed.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
