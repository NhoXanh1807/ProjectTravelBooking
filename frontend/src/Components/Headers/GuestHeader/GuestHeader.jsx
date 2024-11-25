import React from 'react';
import './GuestHeader.css';

const GuestHeader = () => {
    return (
        <header className='GuestHeader'>
            <div className="header-left">
                <h1>Tripzy</h1>
            </div>
            <div className="header-right">
                <ul>
                    <li>Home</li>
                    <li>Tours</li>
                    <li>Login</li>
                    <li>Register</li>
                </ul>
            </div>
        </header>
    );
};

export default GuestHeader;