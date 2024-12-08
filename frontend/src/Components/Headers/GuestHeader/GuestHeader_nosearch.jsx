import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaLocationDot } from 'react-icons/fa6';
import './GuestHeader.css';
import SearchMore from '../../../shared/Searched-bar/search_more';
const GuestHeadernoSearch = ({ handleClick }) => {
    return (
        <section className='section-1'>
            <header className='GuestHeader'>
                <div className="header-left">
                    <Link to="/" className='logo'>Tripzy</Link>
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/tour" className="header-link">Tours</Link>
                    <Link to="/login" className="header-link">Login</Link>

                    <Link to="/register" className="header-link">
                        <button>Register</button>
                    </Link>
                </div>
            </header>
        </section>
    );
};

export default GuestHeadernoSearch;