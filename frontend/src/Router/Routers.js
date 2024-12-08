import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import Tours from "../Pages/Tours/Tours";
import ToursDetail from "../Pages/Tours/ToursDetail";
import SearchResult from "../Pages/Tours/ToursDetail";
import Login from "../Pages/LoginRegister/Login/Login";
import Register from "../Pages/LoginRegister/Register/Register";
import Recovery from "../Pages/LoginRegister/Login/Recovery";
import Policy from "../shared/policy/policy";
import TourOperator from "../Pages/TourOperator/TourOperator";
import OperatorReports from "../Pages/TourOperator/OperatorReports";
import ViewBooking from "../shared/ViewBooking/ViewBooking";
import ViewBookingRefund from "../shared/ViewBooking/ViewBookingRefund";
import TourBooking from "../Pages/booking/booking";
import PaymentPage from "../Pages/Payment/Payment";
import RefundPage from "../Pages/Refund/Refund";
import ProtectedRoute from "./ProtectedRoute";
import TourResult from "../Pages/Tours/TourResult";
import TourResultOperator from "../Pages/Tours/TourResult_op";
const Routers = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <Routes>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" />} />
            
            {/* Public Routes */}
            <Route path="/home" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/tour" element={<Tours isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/tour/:id" element={<ToursDetail isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/policy/:id" element={<Policy />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/tour/search" element={<SearchResult />} />
            <Route path="/view-booking" element={<ViewBooking />} /> {/* New route added */}
            <Route path="/view-booking/:id" element={<ViewBooking />} />
            <Route path="/tour-result-traveler" element={<TourResult isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/tour-result-operator" element={<TourResultOperator/>}/>
            {/* Protected Routes */}
            <Route
                path="/tour-operator" 
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <TourOperator />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <OperatorReports />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/booking"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <TourBooking isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/booking-refund"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ViewBookingRefund />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/refund"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <RefundPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/payment"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <PaymentPage />
                    </ProtectedRoute>
                }
            />

            {/* 404 - Not Found */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
    );
};

export default Routers;
