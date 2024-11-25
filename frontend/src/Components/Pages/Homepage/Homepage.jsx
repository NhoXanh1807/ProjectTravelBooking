import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    return (
        <div className='Homepage'>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Homepage;