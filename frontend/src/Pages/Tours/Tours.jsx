import SearchMore from "../../shared/Searched-bar/search_more";
import Tourbar from "../../shared/mostsearched/tourbar";
import tourData from '../../assets/data/tour';
import ToursDetail from '../../Pages/Tours/ToursDetail';
import React, { useState } from 'react';
import './Tours.css'
import TravelerHeaderTour from "../../Components/Headers/TravelerHeader/TravelerHeader_tour";
import GuestHeaderTour from "../../Components/Headers/GuestHeader/GuestHeader_tour";
function Tours({ isLoggedIn, setIsLoggedIn }) {
    const [selectedTour, setSelectedTour] = useState(null);
    const handleItemClick = (tour) => {
        setSelectedTour(tour);
        
    };
    const handleClick = () => {
        setIsLoggedIn(false);
    };
    return (
        <div className="alltours">
            {isLoggedIn ? (
                <TravelerHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            ) : (
                <GuestHeaderTour isLoggedIn={isLoggedIn} handleClick={handleClick} />
            )}
            <div className="tourBars">
                {tourData.map((tour) => (
                    <Tourbar
                        key={tour._id}
                        item={tour}
                        onClick={() => handleItemClick(tour)}
                    />
                ))}
            </div>

            </div>            
    );
}

export default Tours;