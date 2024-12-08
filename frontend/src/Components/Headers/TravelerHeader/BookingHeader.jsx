// TravelerHeader.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TravelerHeader.css';
import SearchBar from '../../../shared/Searched-bar/searched-bar';
const BookingHeader = ({ handleClick }) => {
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
                    <Link to="/" className="header-link"><button onClick={handleClick} className='button-logout'>Log out<i className="fa-solid fa-right-from-bracket"></i></button></Link>
                </div>
            </header>


        </section>
    );
};

export default BookingHeader;
