// import React, { useState } from 'react';
import '../../styles/Homepage.css';
import GuestHeader from '../../Components/Headers/GuestHeader/GuestHeader';
import TravelerHeader from '../../Components/Headers/TravelerHeader/TravelerHeader';
// import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footers/Footer';
import MostSearched from '../../shared/mostsearched/most_searched';
import Tag from '../../shared/tag/tag';
import Policy from '../../shared/policy/policy';

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
