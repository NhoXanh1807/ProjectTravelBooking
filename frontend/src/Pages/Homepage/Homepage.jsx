import React, { useState } from 'react';
import './Homepage.css';
import GuestHeader from '../../Components/Headers/GuestHeader/GuestHeader';
import TravelerHeader from '../../Components/Headers/TravelerHeader/TravelerHeader';
import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footers/Footer';
import MostSearched from '../../Components/section/most_searched_tour/most_searched_tour';
import Tag from '../../Components/tag/tag';
import Policy from '../../Components/policy/policy';

function Homepage({ isLoggedIn, setIsLoggedIn }) {
    const handleClick = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <TravelerHeader isLoggedIn={isLoggedIn} handleClick={handleClick} />
            ) : (
                <GuestHeader isLoggedIn={isLoggedIn} handleClick={handleClick} />
            )}

            <div className="mostsearched">
                <MostSearched />
            </div>
            <div className="tag">
                <Tag />
            </div>
            <div className="policy">
                <Policy />
            </div>
            <Footer />
        </div>
    );
}

export default Homepage;
