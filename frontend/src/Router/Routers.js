import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from "../Pages/Homepage/Homepage";
import Tours from "../Pages/Tours/Tours";
import ToursDetail from "../Pages/Tours/ToursDetail";
import SearchResult from "../Pages/Tours/ToursDetail";
import Login from "../Pages/LoginRegister/Login/Login";
import Register from "../Pages/LoginRegister/Register/Register";
import Recovery from "../Pages/LoginRegister/Login/Recovery";
import Policy from "../shared/policy/policy";
const Routers = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path="/home" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/tour" element={<Tours isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/tour/tourdetail" element={<ToursDetail />} />
            <Route path="/policy/:id" element={<Policy/>}/>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/tour/search" element={<SearchResult />} />   
        </Routes>
    );
};

export default Routers;

//<Route path="/home" element={<Homepage />} /> 