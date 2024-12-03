import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__middle">
                    <nav className="footer__middle-links">
                        <ul>
                            <li>
                                <Link to={'/home'}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/tour'}>Tour</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Booking</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="footer__socials">
                        <ul>
                            <li>
                                <Link to={'/'}>
                                    <i className="fa-brands fa-facebook" />
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    <i className="fa-brands fa-x-twitter" />
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    <i className="fa-brands fa-instagram" />
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    <i className="fa-brands fa-youtube" />
                                </Link>
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
                            <Link to={'/policy/2'}>Terms of Service</Link>
                            </li>
                            <li>
                            <Link to={'/policy/1'}>Privacy Policy</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>

    );
};
export default Footer;