import React from 'react';
import './mostSearched.css';
import TourCard from './tourcard';
import tourData from '../../assets/data/tour'; // Assuming this contains the tour data

function MostSearched() {
    return (
        <section className="tours-section">
            <h2 className="tours-section__title">Most searched tours</h2>
            <div className="tour-cards" id="tour-cards">
                {
                    tourData.map((item, index) => (
                        <TourCard key={index} item={item} />
                    ))
                }
            </div>
        </section>
    );
}

export default MostSearched;
