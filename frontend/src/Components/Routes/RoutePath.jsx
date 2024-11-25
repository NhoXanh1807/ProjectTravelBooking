import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/LoginRegister/Login/Login"; // Adjust the path if Login.jsx is in a different folder
import Register from "../Pages/LoginRegister/Register/Register"; // Adjust the path if Register.jsx is in a different folder
import Homepage from "../Pages/Homepage/Homepage" // Adjust the path if Homepage.jsx is in a different folder
import Recovery from "./../Pages/LoginRegister/Login/Recovery"; // Adjust the path if Recovery.jsx is in a different folder

const RoutePath = () => {
    return (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Homepage />} /> {/* Default route to Login */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recovery" element={<Recovery />} />
            </Routes>
          </div>
        </Router>
      );
}

export default RoutePath