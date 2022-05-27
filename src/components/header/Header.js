import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DropdownAuthors from "./DropdownAuthors";
import DropdownGenre from "./DropdownGenre";
import { getWishlistById } from "../../store/wishlistSlice";
import { logoutService } from "../../store/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.books);
    const quantity = useSelector(state => state.cart.quantity);
    const totalResult = cart.reduce((total, currentValue) => total = total + currentValue.price, 0);
    const localUser = JSON.parse(localStorage.getItem('user'));

    const handleWishlistRequets = () => {
        dispatch(getWishlistById(localUser.id));
        navigate("/wishlist");
    };

    const handleLogout = () => {
        dispatch(logoutService());
        alert(localUser + "succesfully logout");
    };

    return (
        <header>
            <div className="header-secondary-wrap">
                <div className="header-secondary-primary-wrap">
                    <nav>
                        <ul className="nav">
                            <li className="nav-link">
                            <Link to="/">
                                <div className="nav-item">
                                    <p>LIBRARY</p>
                                </div>
                            </Link>
                            </li>
                            <li className="nav-link" id="nav-genre">
                                <div className="nav-item">
                                    <DropdownGenre />
                                </div>
                            </li>
                            <li className="nav-link">
                                <div className="nav-item">
                                    <DropdownAuthors />
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className="right-section">
                        {localUser ? 
                        (localUser.admin? 
                        <div className="right-nav-item" id="admin-header-button-container">
                            <button className="admin-header-button" onClick={() => {navigate("/admin")}}>ADMIN <FontAwesomeIcon icon={faUser} className="user-icon" /></button> 
                        </div>
                        :  
                        <div className="right-nav-item" id="admin-header-button-container">
                            <button className="admin-header-button" onClick={handleLogout}>LOGOUT {" "} <FontAwesomeIcon icon={faUser} className="user-icon" /> </button> 
                        </div>
                        ): null}
                        <div className="right-nav-item" id="wishlist-header-button-container">
                            <button className="wishlist-header-button" onClick={handleWishlistRequets}>WISHLIST <FontAwesomeIcon icon={faHeart} className="user-icon" /></button> 
                        </div>
                        <NavLink className="navlink" to="join">
                            <div className="right-nav-item join">
                                <FontAwesomeIcon icon={faUser} className="user-icon" />{" "}{localUser ? "welcome " + localUser.username : "Sign in/Join"} 
                            </div>
                        </NavLink>
                        <NavLink className="navlink" to="/cart">
                            <div className="right-nav-item cart-nav">
                                <div className="total">
                                    {totalResult.toFixed(2)} $
                                </div>
                                <div className="line"></div>
                                <div className="cart-wrap">
                                    <p id="cart-text">{quantity}{" "}<FontAwesomeIcon icon={faShoppingCart} id="cart-nav-icon" className="user-icon" /></p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;