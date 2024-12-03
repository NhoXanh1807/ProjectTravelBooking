import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ item }) => {
    // Destructure the necessary fields from the item
    const { _id, imgUrl, TourName, Locations, Duration, Price } = item;
    
    // Create a string for locations
    const locationInfo = Locations.join(', ');

    return (
        <div className="tour-item">
            <div className="tour-item__image">
                {/* Render the image URL */}
                <img src={imgUrl} alt={TourName} />
            </div>
            <div className="tour-item__content">
                <h3 className="tour-item__title">
                    <Link to={`/tour/${_id}`}>{TourName}</Link>
                </h3>
                <div className="tour-item__info">
                    <div className="tour-item__info-item location-info">
                        Location: <b>{locationInfo}</b>
                    </div>
                    <div className="tour-item__info-item duration-info">
                        Duration: <b>{Duration}</b>
                    </div>
                </div>
                <div className="tour-item__price">${Price}</div>
            </div>
        </div>
    );
}

export default TourCard;
