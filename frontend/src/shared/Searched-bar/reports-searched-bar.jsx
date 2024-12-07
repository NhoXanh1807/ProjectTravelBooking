import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './reports-searched-bar.css';
function SearchBar() {
    const [location, setLocation] = useState("Newest");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    return (
        <div className="search-bar">
            <div className="search-keywords">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" id="" />
            </div>
            <div className="select-group">
                <div className="search-bar__inner-right">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>Sort by:</span>
                </div>
                <div className="custom-select-container">
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        aria-label="Select location"
                    >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
            </div>



            <button aria-label="Search for trips">Search</button>
        </div>
    );
}

export default SearchBar;