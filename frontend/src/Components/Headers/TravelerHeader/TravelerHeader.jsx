import {React, useState} from 'react';
import './TravelerHeader.css';
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

    return (
        <header className='TravelerHeader'>
            <div className="header-above">
                <div className="header-left">
                    <Link to="/" className='logo'>
                        <h1>Tripzy</h1>
                    </Link>
                    
                </div>
                <div className="header-right">
                    <Link tp ="/" state= {{isLoggedIn: isLoggedIn}} className="header-link">Home</Link>
                    <Link to="/tours" state= {{isLoggedIn: isLoggedIn}} className="header-link">Tours</Link>
                    <Link to="/booking" state= {{isLoggedIn: isLoggedIn}} className="header-link">Booking</Link>
                    <button onClick={handleClick}>Log out</button>
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

export default TravelerHeader;