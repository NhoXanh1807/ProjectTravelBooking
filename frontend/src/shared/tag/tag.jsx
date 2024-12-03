import './inner-tag.css';
import React from 'react';
import { Link } from 'react-router-dom';
function Tag() {
    return (
        <div className="inner-tag">
            <div className="container">
                <div className="inner-tag__warp">
                    <div className="inner-tag__image">
                        <img src="./image-1.png" alt="" />
                    </div>
                    <div className="inner-tag__content">
                        <h2 className="inner-tag__inner-title">
                            <div className="inner-tag__title-main">Take only memories</div>
                            <div className="inner-tag__title-sub">Leave only footprints !</div>
                        </h2>
                        <div className="inner-tag__desc">
                            Our carefully curated tours offer unforgettable experiences,
                            connecting you with stunning destinations, local cultures, and unique
                            activities tailored to every travel style.
                        </div>
                        <div className="inner-tag__buttons">
                            <Link to={'/booking'}>
                                Booking now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Tag;