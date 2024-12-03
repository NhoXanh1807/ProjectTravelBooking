// TravelerHeader.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TravelerHeader.css';
<<<<<<< HEAD
import SearchBar from '../../../shared/Searched-bar/searched-bar';
const TravelerHeader = ({ handleClick }) => {
    const [location, setLocation] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
=======
import { Link } from 'react-router-dom';
import {FaLocationDot} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const TravelerHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsLoggedIn(false); // Set the state
        navigate("/", { state: { isLoggedIn: false } }); // Navigate to Homepage with state
    };

    const HandleNavigate = (link) => {
        navigate(link, { state: { isLoggedIn: true } });
    }

>>>>>>> 833d9e0176c501dd63314fe1baaa63026b808b35
    return (
        <section className='section-1'>
            <header className='TravelerHeader'>
                <div className="header-left">
                    <Link to="/" className='logo'>Tripzy</Link>
                </div>
                <div className="header-right">
<<<<<<< HEAD
                    <Link to="/home" className="header-link">Home</Link>
                    <Link to="/tour" className="header-link">Tours</Link>
                    <Link to="/booking" className="header-link">Booking</Link>
                    <button onClick={handleClick} className='button-logout'>Log out<i className="fa-solid fa-right-from-bracket"></i></button>
=======
                    <Link tp ="/" state= {{isLoggedIn: isLoggedIn}} className="header-link">Home</Link>
                    <Link to="/tours" state= {{isLoggedIn: isLoggedIn}} className="header-link">Tours</Link>
                    <Link to="/booking" state= {{isLoggedIn: isLoggedIn}} className="header-link">Booking</Link>
                    <button onClick={handleClick}>Log out</button>
>>>>>>> 833d9e0176c501dd63314fe1baaa63026b808b35
                </div>
            </header>
            <SearchBar/>
         
            
        </section>
    );
};

export default TravelerHeader;
