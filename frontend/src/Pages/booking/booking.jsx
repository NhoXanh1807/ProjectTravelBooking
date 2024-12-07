import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import Tourbarthree from "../../shared/mostsearched/tourbar_three";
import tourData from "../../assets/data/tour";
import TravelerHeader from "../../Components/Headers/TravelerHeader/TravelerHeader";
import Tourbarfourth from "../../shared/mostsearched/tourbar_four";
import bookingData from "../../assets/data/booking";
import BookingHeader from "../../Components/Headers/TravelerHeader/BookingHeader"
import Footer from "../../Components/Footers/Footer"
function TourBooking({ isLoggedIn, setIsLoggedIn }) {
    const [selectedTourId, setSelectedTourId] = useState(null); // Track the selected tour's ID
    const [totalPrice, setTotalPrice] = useState(0); // Track the total price
    const [activeSection, setActiveSection] = useState("unpaid"); // Track the active section ("unpaid" or "paid")
    const navigate = useNavigate();

    const handleItemClick = (tour) => {
        setSelectedTourId(tour._id); // Update the selected tour's ID
        setTotalPrice(tour.Price); // Update the total price when a tour is selected
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/"); // Redirect to the homepage
    };

    const toggleSection = (section) => {
        setActiveSection(section); // Toggle between "unpaid" and "paid" sections
    };

    return (
        <div className="tourBooking">
            <BookingHeader isLoggedIn={isLoggedIn} handleClick={handleLogout} />
            <div className="tourBookingHeader">
                <div className="tourBookingHeader-btns">
                    <button
                        className={`unpaid ${activeSection === "unpaid" ? "active" : ""}`}
                        onClick={() => toggleSection("unpaid")}
                    >
                        UNPAID
                    </button>
                    <button
                        className={`paid ${activeSection === "paid" ? "active" : ""}`}
                        onClick={() => toggleSection("paid")}
                    >
                        PAID
                    </button>
                </div>
            </div>

            {/* Conditional rendering based on activeSection */}
            {activeSection === "unpaid" && (
                <div className="tourBookingHeader-content-unpaid">
                    {bookingData
                        .filter((booking) => booking.BookingStatus === "Pending") // Filter only pending bookings
                        .map((booking) => {
                            const tour = tourData.find((tour) => tour._id === booking.TourID);

                            if (tour && tour.TourStatus === "Available") {
                                return (
                                    <div key={tour._id}>
                                        <Tourbarthree
                                            item={tour}
                                            booking={booking}
                                            isSelected={selectedTourId === tour._id} // Pass selection status
                                            onClick={() => handleItemClick(tour)} // Handle item selection
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={tour._id}>
                                    <Tourbarfourth
                                        item={tour}
                                        booking={booking}
                                        isSelected={selectedTourId === tour._id} // Pass selection status
                                        onClick={() => handleItemClick(tour)} // Handle item selection
                                    />
                                </div>
                            );
                        })}
                </div>
            )}

            {activeSection === "paid" && (
                <div className="tourBookingHeader-content-paid">
                    {bookingData
                        .filter((booking) => booking.BookingStatus === "Confirmed") // Filter only confirmed bookings
                        .map((booking) => {
                            const tour = tourData.find((tour) => tour._id === booking.TourID);

                            return (
                                <div key={tour._id}>
                                    <Tourbarfourth
                                        item={tour}
                                        booking={booking}
                                        isSelected={selectedTourId === tour._id} // Pass selection status
                                        onClick={() => handleItemClick(tour)} // Handle item selection
                                    />
                                </div>
                            );
                        })}
                </div>
            )}

            <div className="tourBookingHeader-foot">
                <div className="tourBookingHeader-foot-content">
                    TOTAL PAYMENT:
                </div>
                <div className="tourBookingHeader-foot-price">
                    {totalPrice > 0 ? `${new Intl.NumberFormat('vi-VN').format(totalPrice)} VND` : "0"}
                </div>
                <div className="tourBookingHeader-foot-btn">
                    <button>PAY</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default TourBooking;
