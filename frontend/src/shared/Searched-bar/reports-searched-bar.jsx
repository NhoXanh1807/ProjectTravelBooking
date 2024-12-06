import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import './reports-searched-bar.css';
function ReportsSearchBar(){
    const [sortType, setSortType] = useState("newest");
    return (
        <div className="reports-search-bar">
            <input type="text"/>

            <div className="choose-sort">
                Sort by:
                <select
                    value={sortType} 
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            <button aria-label="Search for trips">Search</button>
        </div>
    );
}

export default ReportsSearchBar;