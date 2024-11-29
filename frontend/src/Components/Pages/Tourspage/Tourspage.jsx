import React from 'react';
import './Tourspage.css';
import GuestHeader from '../../Headers/GuestHeader/GuestHeader';
import TravelerHeader from '../../Headers/TravelerHeader/TravelerHeader';
import ManagerHeader from '../../Headers/ManagerHeader/ManagerHeader';
import { useLocation } from 'react-router-dom';

function Tourspage() {
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
            <div className='Tourpage'>
                
            </div>
        </body>
    )

    
}

export default Tourspage;