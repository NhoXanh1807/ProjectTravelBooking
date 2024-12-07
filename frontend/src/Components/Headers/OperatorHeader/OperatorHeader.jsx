import React from 'react';
import './OperatorHeader.css';
import {Link, useNavigate} from 'react-router-dom';


const OperatorHeader = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Handle logout
        navigate("/", { state: { isLoggedIn: false, isOperator: false } }); // Navigate to Homepage with state
    };

    return (
        <header className='OperatorHeader'>
            <div className="header-left">
                <Link to="/tour-operator" className='logo'>Tripzy</Link>
            </div>
            <div className="header-right">
                <Link to='/tour-operator' state={{isLoggedIn: true, isOperator: true}} className='header-link'>Tours</Link>
                <Link to='/reports' stat={{isLoggedIn:true, isOperator: true}} className='header-link'>Reports</Link>
                <button onClick={handleClick} className='button-logout'>Log out<i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
        </header>
    );
};

export default OperatorHeader;