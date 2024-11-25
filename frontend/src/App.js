import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/LoginRegister/Login"; // Adjust the path if Login.jsx is in a different folder
import Register from "./Components/Pages/LoginRegister/Register"; // Adjust the path if Register.jsx is in a different folder
import Homepage from "./Components/Pages/Homepage/Homepage"; // Adjust the path if Homepage.jsx is in a different folder
import Recovery from "./Components/Pages/LoginRegister/Recovery";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
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

export default App;
