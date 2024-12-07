import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './searched-bar.css';
function SearchBar(){
    const [location, setLocation] = useState("Hồ Chí Minh");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    return (
        <div className="search-bar">
            <div className="select-group">
                <div className="search-bar__inner-right">
                <i class="fa-solid fa-location-dot"></i>
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

            <Link to='/tour' className='header-link'><button aria-label="Search for trips">Search</button></Link>
        </div>
    );
}

export default SearchBar;