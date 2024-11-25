import React from 'react';
//import { Link } from 'react-router-dom';
import './Homepage.css';
import GuestHeader from '../../Headers/GuestHeader/GuestHeader';
import TravelerHeader from '../../Headers/TravelerHeader/TravelerHeader';
import { useLocation } from 'react-router-dom';

function Homepage() {
    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;
    if (!isLoggedIn) {
        return (
            <body>
                <GuestHeader/>
                <div className='Homepage'>
                </div>
            </body>
        );
    }
    
    else {
        return (
            <body>
                <TravelerHeader/>
                <div className='Homepage'>
                </div>
            </body>
        );
    }
};

export default Homepage;