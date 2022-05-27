import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer>
                <div className='container'>
                <div className="social-footer-container">
                    <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://twitter.com/"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></a>
                </div>
                <ul className="footer-list-inline">
                    <li className="list-inline-item"><a href="/">Home</a></li>
                    <li className="list-inline-item"><a href="/">Services</a></li>
                    <li className="list-inline-item"><a href="/">About</a></li>
                    <li className="list-inline-item"><a href="/">Terms</a></li>
                    <li className="list-inline-item"><a href="/">Privacy Policy</a></li>
                </ul>
                <p className="copyright">Made by MM© 2022</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;