import React, { useState } from 'react';
import './GuestHeader.css';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';

const GuestHeader = ({ isLoggedIn, handleClick }) => {
    const [location, setLocation] = useState("Hồ Chí Minh");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    return (
        <section className='section-1'>
            <header className='GuestHeader'>
                <div className="header-left">
                    <Link to="/" className='logo'>Tripzy</Link>
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/tours" className="header-link">Tours</Link>
                    <Link to="/booking" className="header-link">Booking</Link>
                    {isLoggedIn ? (
                        <button onClick={handleClick}>
                            Log out <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    ) : (
                        <Link to="/register" className="header-link"><button>Register</button></Link>
                    )}
                </div>
            </header>

            <div className="search-bar">
                <div className="select-group">
                    <div className="search-bar__inner-right">
                        <FaLocationDot className="location-icon" />
                        <span>Location:</span>
                    </div>
                    <div className="custom-select-container">
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
                        aria-label="From date"
                    />
                    <div className="bar">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                    To:
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        aria-label="To date"
                    />
                </div>

                <button aria-label="Search for trips">Search</button>
            </div>
        </section>
    );
};

export default GuestHeader;
