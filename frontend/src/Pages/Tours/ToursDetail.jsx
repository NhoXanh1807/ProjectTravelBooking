import React from 'react';
import './ToursDetail.css';

const ToursDetail = ({ tour, open, onClose }) => {
    if (!tour) return null;
    if (!open) return null;

    return (
        <div className="modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2 className="modal-title">{tour.TourName}</h2>
                <div className="modal-body">
                    <div className="modal-image">
                        <img src={tour.imgUrl} alt={tour.TourName} />
                    </div>
                    <div className="modal-info">
                        <p><b>Price:</b> {tour.Price} VND</p>
                        <p><b>Location:</b> {tour.Locations.join(', ')}</p>
                        <p><b>Available Seats:</b> {tour.AvailableSeats}</p>
                        <p><b>Duration:</b> {tour.Duration}</p>
                        <p><b>Languages Offered:</b> {tour.LanguageOffers.join(', ')}</p>
                        <p><b>Cancellation Policy:</b> {tour.CancellationPolicy}</p>
                        <p><b>Description:</b> {tour.Description}</p>
                        <button className="book-btn">Book Now</button>
                        <div className="social-media-links">
                            <i className="fa-solid fa-facebook"></i>
                            <i className="fa-solid fa-twitter"></i>
                            <i className="fa-solid fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToursDetail;
