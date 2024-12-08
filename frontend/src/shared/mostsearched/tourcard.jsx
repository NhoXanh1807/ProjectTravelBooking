import React from 'react';
import './mostSearched.css';
import { Link } from 'react-router-dom';

const TourCard = ({ item, isLoggedIn }) => {
    const { TourName, Locations, Duration, Price, _id, imgUrl } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);

    // Define the image URL array

    // Select the correct image for the item
    const selectedImgUrl =  imgUrl[0];
    console.log('Image URL:', selectedImgUrl);
    return (
        <Link to={`/tour/${_id}`} className="tour-card-link">
            <div className="tour-item">
                <div className="tour-item__image">
                    <img src={selectedImgUrl} alt={TourName} />
                    
                </div>
                <div className="tour-item__content">
                    <h3 className="tour-item__title">{TourName}</h3>
                    <div className="tour-item__info">
                        <div className="tour-item__info-item location-info">
                            Location: <b>{Locations.join(', ')}</b>
                        </div>
                        <div className="tour-item__info-item duration-info">
                            Duration: <b>{Duration}</b>
                        </div>
                    </div>
                    <div className="tour-item__price">{formattedPrice} VND</div>
                </div>
            </div>
        </Link>
    );
};

export default TourCard;