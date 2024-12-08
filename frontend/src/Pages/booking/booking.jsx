import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./booking.css";
import Tourbarthree from "../../shared/mostsearched/tourbar_three";
import Tourbarfourth from "../../shared/mostsearched/tourbar_four";
import TravelerHeader from "../../Components/Headers/TravelerHeader/TravelerHeader";
import BookingHeader from "../../Components/Headers/TravelerHeader/BookingHeader";
import Footer from "../../Components/Footers/Footer";
import { BASE_URL } from "../../utils/config";
import { jwtDecode } from "jwt-decode";

function TourBooking({ isLoggedIn, setIsLoggedIn }) {
    const [unpaidBookings, setUnpaidBookings] = useState([]);
    const [paidBookings, setPaidBookings] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeSection, setActiveSection] = useState("unpaid");
    const navigate = useNavigate();

    const getToken = () => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        return token;
    };

    const getTravelerID = () => {
        const token = getToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);
                return decodedToken.id; // Make sure "id" is the correct field in your token payload
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = getToken();
                if (!token) {
                    console.error("Token not found");
                    return;
                }

                const TravelerID = getTravelerID();
                if (!TravelerID) {
                    console.error("TravelerID not found in token");
                    return;
                }

                // Fetch unpaid bookings
                const unpaidResponse = await fetch(`${BASE_URL}/bookings/user/unpaid/${TravelerID}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!unpaidResponse.ok) {
                    console.error("Failed to fetch unpaid bookings", await unpaidResponse.text());
                    return;
                }

                const unpaidData = await unpaidResponse.json();
                console.log("Unpaid Bookings Data:", unpaidData);
                setUnpaidBookings(Array.isArray(unpaidData) ? unpaidData : []);

                // Fetch paid bookings
                const paidResponse = await fetch(`${BASE_URL}/bookings/user/paid/${TravelerID}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!paidResponse.ok) {
                    console.error("Failed to fetch paid bookings", await paidResponse.text());
                    return;
                }

                const paidData = await paidResponse.json();
                console.log("Paid Bookings Data:", paidData);
                setPaidBookings(Array.isArray(paidData) ? paidData : []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handleItemClick = (tour, booking) => {
        console.log("Selected Tour:", tour);
        console.log("Selected Booking:", booking);
        setSelectedTour(tour);
        setSelectedBooking(booking);
        setTotalPrice(tour.Price);
    };

    const handleLogout = () => {
        console.log("User logged out");
        setIsLoggedIn(false);
        navigate("/");
    };

    const toggleSection = (section) => {
        console.log("Active Section Changed:", section);
        setActiveSection(section);
    };

    return (
        <div className="tourBooking">
            <BookingHeader isLoggedIn={isLoggedIn} handleClick={handleLogout} />
            <div className="tourBookingHeader">
                <div className="tourBookingHeader-name">Your Booked Tours</div>
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
                    {unpaidBookings.map((tour) => (
                        tour && tour.TourStatus === "Available" ? (
                            <Tourbarthree
                                key={tour.BookingID}
                                item={tour}
                                isSelected={selectedTour === tour}
                                onClick={() => handleItemClick(tour)}
                            />
                        ) : (
                            <Tourbarfourth
                                key={tour.BookingID}
                                item={tour}
                                isSelected={selectedTour === tour}
                                onClick={() => handleItemClick(tour)}
                            />
                        )
                    ))}

                </div>
            )}

            {activeSection === "paid" && (
                <div className="tourBookingHeader-content-paid">
                    {paidBookings.map((tour) => (
                        <Tourbarfourth
                            key={tour.BookingID}
                            item={tour}
                            isSelected={selectedTour === tour}
                            onClick={() => handleItemClick(tour)}
                        />
                    ))}
                </div>
            )}

            {activeSection !== "paid" && (
                <div className="tourBookingHeader-foot">
                    <div className="tourBookingHeader-foot-content">TOTAL PAYMENT:</div>
                    <div className="tourBookingHeader-foot-price">
                        {totalPrice > 0
                            ? `${new Intl.NumberFormat("vi-VN").format(totalPrice)} VND`
                            : "0"}
                    </div>
                    <div className="tourBookingHeader-foot-btn">
                        <Link
                            to="/payment"
                            state={{
                                booking: selectedBooking,
                                tour: selectedTour,
                            }}
                        >
                            <button disabled={!selectedTour && !selectedBooking}>PAY</button>
                        </Link>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default TourBooking;
