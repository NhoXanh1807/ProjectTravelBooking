import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ToursDetail.css';
import Footer from '../../Components/Footers/Footer';
import GuestHeadernoSearch from '../../Components/Headers/GuestHeader/GuestHeader_nosearch';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';
import { BASE_URL } from '../../utils/config';

const ToursDetail = ({ isLoggedIn, setIsLoggedIn }) => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBooking, setIsBooking] = useState(false); // Trạng thái booking

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours/${id}`);
                if (!response.ok) {
                    throw new Error('Tour not found');
                }
                const data = await response.json();
                setTour(data);
                if (data?.data?.imgUrl?.length > 0) {
                    setSelectedImage(data.data.imgUrl[0]);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTourData();
    }, [id]);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleBook = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        setIsBooking(true); // Đặt trạng thái booking

        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await fetch(`${BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Gửi token để xác thực
                },
                body: JSON.stringify({
                    TourID: id,
                    TravelerID: token ? JSON.parse(atob(token.split('.')[1])).id : null,
                    TotalPrice: tour.data.Price,
                    BookingStatus: 'Pending',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            alert('Booking successful!');
            navigate('/booking'); // Điều hướng tới trang danh sách booking
        } catch (error) {
            alert(error.message || 'Booking failed!');
        } finally {
            setIsBooking(false); // Reset trạng thái booking
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!tour) {
        return (
            <div className="tour-not-found">
                <p>Tour not found!</p>
                <button onClick={() => navigate('/tour')}>Go Back</button>
            </div>
        );
    }

    return (
        <>
            {isLoggedIn ? (
                <BookingHeader isLoggedIn={isLoggedIn} handleClick={handleLogout} />
            ) : (
                <GuestHeadernoSearch isLoggedIn={isLoggedIn} handleClick={handleLogout} />
            )}

            <div className="tourdetail-content">
                <div className="tourdetail-image">
                    <div className="tourdetail-image-main">
                        <img src={selectedImage} alt={tour.data.TourName} />
                    </div>
                    <div className="tourdetail-image-slice-bar">
                        {tour.data.imgUrl.map((image, index) => (
                            <div
                                key={index}
                                className="tourdetail-image-thumbnail"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tourdetail-info">
                    <h2 className="tourdetail-title">
                        {tour.data.TourName}
                        <button onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </h2>
                    <div className="tourdetail-book-btn">
                        <button
                            className="book-btn"
                            onClick={handleBook}
                            disabled={isBooking}
                        >
                            {isBooking ? 'Booking...' : 'Book'}
                        </button>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Price:</div>
                        <div className="tourdetail-info-val">
                            {tour.data.Price.toLocaleString('vi-VN')} VND
                        </div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Location:</div>
                        <div className="tourdetail-info-val">{tour.data.Locations.join(', ')}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Available Seats:</div>
                        <div className="tourdetail-info-val">{tour.data.AvailableSeats}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Duration:</div>
                        <div className="tourdetail-info-val">{tour.data.Duration}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Languages Offered:</div>
                        <div className="tourdetail-info-val">{tour.data.LanguageOffers.join(', ')}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Description:</div>
                        <div className="tourdetail-info-val">{tour.data.Description}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Type:</div>
                        <div className="tourdetail-info-val">{tour.data.Type}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ToursDetail;
