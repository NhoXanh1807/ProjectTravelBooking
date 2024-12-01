import React, { useState } from "react";
import TravelerHeader from "../Headers/TravelerHeader/TravelerHeader";
import GuestHeader from "../Headers/GuestHeader/GuestHeader";
import Routers from "../../Router/Routers";
import Footer from "../Footers/Footer";
const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State moved here

    const handleClick = () => {
        setIsLoggedIn(false); // Log out logic
    };

    return (
        <>
            <Routers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
    );
};
export default Layout;