import React from 'react';
import './mostSearched.css';
import './most_searched';

const TourCard = ({ item, onClick }) => {
    const { imgUrl, TourName, Locations, Duration, Price } = item;
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(Price);
    return (
        <div className="tour-item" onClick={onClick}>
            <div className="tour-item__image">
                <img src={imgUrl} alt={TourName} />
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
    );
};

export default TourCard;
