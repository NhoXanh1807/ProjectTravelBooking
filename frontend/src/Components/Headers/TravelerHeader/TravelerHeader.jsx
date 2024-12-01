// TravelerHeader.jsx
import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
// import {Container,Row,Button} from 'reactstrap';
import './TravelerHeader.css';
const nav_links=[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/tours',
        display:'Tours'
    },
    {
        path:'/booking',
        display:'Booking'
    }
]
const TravelerHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initially logged in
    const [location, setLocation] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        setIsLoggedIn(false);
        navigate("/", { state: { isLoggedIn: false } });
    };

    return (
        <section className='section-1'>
            <header className='TravelerHeader'>
                <div className="header-left">
                    <Link to="/" className='logo'>Tripzy</Link>
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/tours" className="header-link">Tours</Link>
                    <Link to="/booking" className="header-link">Booking</Link>
                    {isLoggedIn ? (
                        <button onClick={handleClick}>Log out<i class="fa-solid fa-right-from-bracket"></i></button>
                    ) : (
                        <Link to="/login" className="header-link">
                            <button>Register</button></Link>
                    )}
                </div>
            </header>

            <div className="search-bar">
                <div className="select-group">
                    <div className="search-bar__inner-right">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>Location:</span>
                    </div>
                    <div class="custom-select-container">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            aria-label="Select location"
                        >
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                        </select>
                    </div>
                </div>

                <div className="choose-date">
                    From:
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        placeholder='From Date'
                        aria-label="From date"
                    />
                    <div className="bar">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    To:
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        placeholder='To Date'
                        aria-label="To date"
                    />
                </div>

                <button aria-label="Search for trips">Search</button>
            </div>
            
        </section>
    );
};

export default TravelerHeader;
