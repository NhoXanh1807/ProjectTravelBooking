import React from 'react';
import './Homepage.css';
import GuestHeader from '../../Headers/GuestHeader/GuestHeader';
import TravelerHeader from '../../Headers/TravelerHeader/TravelerHeader';
import ManagerHeader from '../../Headers/ManagerHeader/ManagerHeader';
import TourList from './TourList/TourList';
import { useLocation } from 'react-router-dom';

function Homepage() {
    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;
    const isTraveler = true;
    const Header = () => {
        if (isLoggedIn) {
            if (isTraveler) {
                return <TravelerHeader />;
            } else {
                return <ManagerHeader />;
            }
        } else {
            return <GuestHeader />;
        }
    }

    return (
        <body>
            {Header()}
            <TourList/>
            <div className='Homepage'>
                
            </div>
        </body>
    )

    
}

export default Homepage;