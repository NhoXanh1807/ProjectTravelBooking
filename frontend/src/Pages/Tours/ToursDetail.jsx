import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ToursDetail.css';
import tourData from '../../assets/data/tour';
import Footer from '../../Components/Footers/Footer';
import GuestHeadernoSearch from '../../Components/Headers/GuestHeader/GuestHeader_nosearch';
import BookingHeader from '../../Components/Headers/TravelerHeader/BookingHeader';

const ToursDetail = ({ isLoggedIn, setIsLoggedIn }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tour = tourData.find((item) => item._id === id);

    const [selectedImage, setSelectedImage] = useState(tour?.imgUrl?.[0] || '');

    if (!tour) {
        return (
            <div className="tour-not-found">
                <p>Tour not found!</p>
                <Link to="/tour">Go Back</Link>
            </div>
        );
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

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
                        <img src={selectedImage} alt={tour.TourName} />
                    </div>
                    <div className="tourdetail-image-slice-bar">
                        {tour.imgUrl.map((image, index) => (
                            <div
                                key={index}
                                className="tourdetail-image-thumbnail"
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`${tour.TourName} thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tourdetail-info">
                    <h2 className="tourdetail-title">{tour.TourName}
                        <button onClick={() => navigate(-1)}><i className="fa-solid fa-xmark"></i></button>
                    </h2>
                    <div className="tourdetail-book-btn">
                        <button className="book-btn" onClick={handleBook}>
                            Book
                        </button>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Price:</div>
                        <div className="tourdetail-info-val">
                            {tour.Price.toLocaleString('vi-VN')} VND
                        </div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Location:</div>
                        <div className="tourdetail-info-val">
                            {tour.Locations.join(', ')}
                        </div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Available Seats:</div>
                        <div className="tourdetail-info-val">{tour.AvailableSeats}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Duration:</div>
                        <div className="tourdetail-info-val">{tour.Duration}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Languages Offered:</div>
                        <div className="tourdetail-info-val">
                            {tour.LanguageOffers.join(', ')}
                        </div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Cancellation Policy:</div>
                        <div className="tourdetail-info-val">
                            {tour.CancellationPolicy}
                        </div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Description:</div>
                        <div className="tourdetail-info-val">{tour.Description}</div>
                    </div>
                    <div className="tourdetail-outer">
                        <div className="tourdetail-info-name">Type:</div>
                        <div className="tourdetail-info-val">
                            {tour.Type}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ToursDetail;
