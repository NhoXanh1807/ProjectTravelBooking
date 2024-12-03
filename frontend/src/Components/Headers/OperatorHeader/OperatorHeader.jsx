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
            <div className="logo">
                <h1>TRIPZY</h1>
            </div>
            <div className="header-right">
                <Link to='/tours' state={{isLoggedIn: true, isOperator: true}} className='link'>Tours</Link>
                <Link to='/reports' stat={{isLoggedIn:true, isOperator: true}} className='link'>Reports</Link>
                <button onClick={handleClick}>Log out</button>
            </div>
        </header>
    );
};

export default OperatorHeader;