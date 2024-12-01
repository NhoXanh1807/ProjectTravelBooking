import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__middle">
                    <nav className="footer__middle-links">
                        <ul>
                            <li>
                                {" "}
                                <a href="#">Home</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">Tour</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">Booking</a>
                            </li>
                            <li>
                                {" "}
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="footer__socials">
                        <ul>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fa-brands fa-facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fa-brands fa-x-twitter" />
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fa-brands fa-instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fa-brands fa-youtube" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="footer__bottom">
                    <div className="footer__copyright">
                        © 2024 GROUP3. All rights reserved.
                    </div>
                    <div className="footer__logo">
                        Tripzy
                    </div>
                    <nav className="footer__bottom-links">
                        <ul>
                            <li>
                                <a href="#">Điều khoản dịch vụ</a>
                            </li>
                            <li>
                                <a href="#">Chính sách bảo mật</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>

    );
};
export default Footer;