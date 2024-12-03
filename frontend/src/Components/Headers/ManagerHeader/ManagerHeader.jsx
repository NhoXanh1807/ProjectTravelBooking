import React from 'react';
import './ManagerHeader.css';
import { Link } from 'react-router-dom';
import {FaLocationDot} from 'react-icons/fa6';

const ManagerHeader = () => {
    return (
        <header className='ManagerHeader'>
            <div className="header-above">
                <div className="header-left">
                    <Link to="/" className='logo'>
                        <h1>Tripzy</h1>
                    </Link>
                    
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/tours" className="header-link">Tours</Link>
                    <Link to="/login" className="header-link">Login</Link>
                    <Link to="/register" className="header-link">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
            
            <div className="header-below">
                <div className='select-group'>
                    <FaLocationDot/>
                    <select>
                        <option hidden value="default">Location</option>
                        <option value="option1">Hồ Chí Minh</option>
                        <option value="option2">Hà Nội</option>
                        <option value="option3">Cần Thơ</option>
                    </select>
                </div>
                
                <input
                    type="Date"
                    placeholder='From Date'
                />
                <input
                    type="Date"
                    placeholder='To Date'
                />
                <button>Search</button>
            </div>
        </header>
    );
};

export default ManagerHeader;