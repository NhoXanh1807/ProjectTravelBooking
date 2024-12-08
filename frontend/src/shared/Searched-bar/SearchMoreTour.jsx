import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchMoreTour.css'
function SearchMoreTour() {
    const [location, setLocation] = useState("Hồ Chí Minh");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    return (
        <div className="SearchMoreTour">
            <div className="SearchMoreTour-one">
                <div className="search-keywords">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="" id="" />
                </div>
                {/* <div className="bar">
                    <i className="fa-solid fa-minus"></i>
                </div> */}
                <div className="select-group-new">
                    <div className="search-bar__inner-right">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>Location:</span>
                    </div>
                    <div className="custom-select-containes">
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
                <div className="link-btn"><Link to='/tour-result-operator'><button aria-label="Search-btn">Search</button></Link></div>
            </div>
            <div className="SearchMoreTour-two">
                <div className="choose-dates">
                Date
                  <div className='choose-date-main'>
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
                </div>
                <div className="choose-pricerange">
                    Price:
                    <div className="choose-pricerange-main">
                    From:
                    <input 
                        type="text" 
                        value={fromPrice}
                        onChange={(e) => setFromPrice(e.target.value)}
                        aria-label="From Price"
                    />
                    <div className="bar">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                    To:
                    <input
                        type="text"
                        value={toPrice}
                        onChange={(e) => setToPrice(e.target.value)}
                        aria-label="To Price"
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchMoreTour;