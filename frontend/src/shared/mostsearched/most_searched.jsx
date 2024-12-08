import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './mostSearched.css';
import TourCard from './tourcard';
import tourData from '../../assets/data/tour';
import ToursDetail from '../../Pages/Tours/ToursDetail';

const MostSearched = ({ isLoggedIn, setIsLoggedIn }) => { // Nhận isLoggedIn và setIsLoggedIn qua props
    const [selectedTour, setSelectedTour] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        setIsOpen(true);
    };

    return (
        <section className="tours-section">
            <h2 className="tours-section__title">Most searched tours</h2>
            <div className="tour-cards" id="tour-cards">
                {tourData.map((tour) => (
                    <TourCard
                        key={tour._id}
                        item={tour}
                        onClick={() => handleItemClick(tour)}
                        isLoggedIn={isLoggedIn} // Truyền isLoggedIn vào TourCard
                        setIsLoggedIn={setIsLoggedIn} // Truyền setIsLoggedIn vào TourCard
                    />
                ))}
            </div>
            
            {isOpen && selectedTour && (
                <ToursDetail
                    tour={selectedTour}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </section>
    );
};

export default MostSearched;
