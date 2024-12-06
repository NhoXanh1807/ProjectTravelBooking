// TravelerHeader.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TravelerHeader.css';
import SearchMore from '../../../shared/Searched-bar/search_more';
const TravelerHeaderTour = ({ handleClick }) => {
    const [location, setLocation] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    return (
        <section className='section-1'>
            <header className='TravelerHeader'>
                <div className="header-left">
                    <Link to="/" className='logo'>Tripzy</Link>
                </div>
                <div className="header-right">
                    <Link to="/home" className="header-link">Home</Link>
                    <Link to="/tour" className="header-link">Tours</Link>
                    <Link to="/booking" className="header-link">Booking</Link>
                    <button onClick={handleClick} className='button-logout'>Log out<i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </header>
            <SearchMore/>
         
            
        </section>
    );
};

export default TravelerHeaderTour;
