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
    const [selectedImage, setSelectedImage] = useState(null);  // Initialize as null or a default image
    const [tour, setTour] = useState(null);  // State lưu dữ liệu tour
    const [loading, setLoading] = useState(true);  // State cho loading
    const [error, setError] = useState(null);  // State cho lỗi
    
    useEffect(() => {
        // Gọi API để lấy dữ liệu tour
        const fetchTourData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours/${id}`);
                if (!response.ok) {
                    throw new Error('Tour not found');
                }
                const data = await response.json();
                setTour(data);  // Lưu dữ liệu tour vào state
                // Set the first image from the fetched data if available
                if (data?.data?.imgUrl?.length > 0) {
                    setSelectedImage(data.data.imgUrl[0]);
                }
            } catch (error) {
                setError(error.message);  // Xử lý lỗi nếu có
            } finally {
                setLoading(false);  // Đặt loading thành false khi đã nhận dữ liệu hoặc gặp lỗi
            }
        };

        fetchTourData();  // Gọi hàm fetch khi component mount
    }, [id]); // Chạy lại khi id thay đổi

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    if (loading) {
        return <div>Loading...</div>; // Hiển thị loading khi đang fetch dữ liệu
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị lỗi nếu có
    }

    if (!tour) {
        return (
            <div className="tour-not-found">
                <p>Tour not found!</p>
                <button onClick={() => navigate('/tour')}>Go Back</button>
            </div>
        );
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleBook = () => {
        if (isLoggedIn) {
            navigate('/booking');
        } else {
            navigate('/login');
        }
    };

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
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tourdetail-info">
                    <h2 className="tourdetail-title">
                        {tour.data.TourName}
                        <button onClick={() => navigate(-1)}><i className="fa-solid fa-xmark"></i></button>
                    </h2>
                    <div className="tourdetail-book-btn">
                        <button className="book-btn" onClick={handleBook}>Book</button>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Price:</div>
                        <div className="tourdetail-info-val">{tour.data.Price.toLocaleString('vi-VN')} VND</div>
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
