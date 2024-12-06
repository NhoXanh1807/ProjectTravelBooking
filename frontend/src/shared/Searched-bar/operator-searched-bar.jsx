import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './operator-searched-bar.css';
function OperatorSearchBar(){
    const [location, setLocation] = useState("Hồ Chí Minh");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromMoney, setFromMoney] = useState("");
    const [toMoney, setToMoney] = useState("");
    return (
        <div className="operator-search-bar">
            <div className="sect">
                <input type="text"/>
                <div className="select-group">
                    <div className="operator-search-bar__inner-right">
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
                <button aria-label="Search for trips">Search</button>
            </div>
            
            <div className="sect">
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

                <div className="choose-money">
                    From:
                    <input
                        type="number"
                        value={fromMoney}
                        onChange={(e) => setFromMoney(e.target.value)}
                        aria-label="From:"
                    />
                    <div className="bar">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                    To:
                    <input
                        type="number"
                        value={toMoney}
                        onChange={(e) => setToMoney(e.target.value)}
                        aria-label="To:"
                    />
                </div>
            </div>
            
            
        </div>
    );
}

export default OperatorSearchBar;