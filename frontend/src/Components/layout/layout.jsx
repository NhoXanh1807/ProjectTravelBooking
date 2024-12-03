import React, { useState } from "react";
import Routers from "../../Router/Routers";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
};

export default Layout;
