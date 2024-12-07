import React, { useContext } from 'react';
import './OperatorHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../../context/AuthContext'; // Assuming you have a context for managing authentication

const OperatorHeader = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext); // Using context to manage authentication state

    const handleClick = () => {
        // Dispatch a logout action to update the global state
        dispatch({ type: 'LOGOUT' });

        // Optionally clear session data (localStorage, cookies, etc.)
        localStorage.removeItem('token');

        // Navigate to homepage with reset state
        navigate("/", { state: { isLoggedIn: false, isOperator: false } });
    };

    return (
        <header className='OperatorHeader'>
            <div className="header-left">
                <Link to="/tour-operator" className='logo'>Tripzy</Link>
            </div>
            <div className="header-right">
                <Link to='/tour-operator' state={{ isLoggedIn: true, isOperator: true }} className='header-link'>Tours</Link>
                <Link to='/reports' state={{ isLoggedIn: true, isOperator: true }} className='header-link'>Reports</Link>
                <button onClick={handleClick} className='button-logout'>Log out<i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
        </header>
    );
};

export default OperatorHeader;
