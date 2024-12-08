
import React, { useState, useEffect } from 'react';
import './mostSearched.css';
import TourCard from './tourcard';
import ToursDetail from '../../Pages/Tours/ToursDetail';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const MostSearched = ({ isLoggedIn, setIsLoggedIn }) => {
    const [selectedTour, setSelectedTour] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours`);
    console.log("Fetched tours data:", tours);
    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        setIsOpen(true);
    };

    return (
        <section className="tours-section">
            <h2 className="tours-section__title">Most searched tours</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading tours: {error}</p>
            ) : (
                <div className="tour-cards" id="tour-cards">
                    {tours.length > 0 ? (
                        tours.map((tour) => (
                            <TourCard
                                key={tour._id}
                                item={tour}
                                onClick={() => handleItemClick(tour)}
                                isLoggedIn={isLoggedIn} // Pass login state to TourCard
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        ))
                    ) : (
                        <p>No most searched tours available.</p>
                    )}
                </div>
            )}

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