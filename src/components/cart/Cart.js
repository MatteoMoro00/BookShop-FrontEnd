import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartBook } from "./CartBook";
import './cart.css';
import { cartActions } from "../../store/cartSlice";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.books);
    const user = useSelector(state => state.user);
    const isLoggedIn = useSelector(state => state.users.isLoggedIn);
    const localUser = JSON.parse(localStorage.getItem('user'));
    const quantity = useSelector(state => state.cart.quantity);
    const booksNum = numberOfBooks(cart);
    const sum = sumOfBooks(cart);
    const [purchaseText, setPurchaseText] = useState(false);
    const totalResult = cart.reduce((total, currentValue) => total = total + currentValue.price,0);

    useEffect(() => {
        document.title = "Your Cart"
    }, []);

    function numberOfBooks(cart) {
        let result = 0;
        cart.forEach(book => result += book.quantity);
        return result;
    };
    
    function sumOfBooks(cart) {
        let sum = 0;
        cart.forEach(book => {
            sum += book.quantity * book.price;
        })
        return sum;
    };

    function handleCheckout() {
        if (!localUser) {
            navigate('/join');
            alert('You have to be registred to buy products!');
            return;
        } else {
            cart.forEach(book => {dispatch(cartActions.removeBookFromCart(book))});
            setPurchaseText(true);
        }
    };

    return (
        <section className="cart-section">
            <h1 className="cart-title">Your Shopping Cart</h1>
            <div className="basket-page-wrap">
                {purchaseText ? <h1 className="purchase-title">THANKS FOR YOUR PURCHASE</h1> : null}
                {cart.length !== 0 ?
                    <div className="cart-info-container">
                        <div className="cart-info">
                            <p className="user-icon-container"><FontAwesomeIcon icon={faShoppingCart} className="user-icon" /></p>
                            <span className="quantity-info">
                                 You have {quantity} book{quantity === 1 ? '' : 's'} in your cart.
                            </span>
                        </div>
                        <button className="cart-purchase-button" onClick={handleCheckout}>
                            Purchase
                        </button>
                    </div>
                    :
                    <div className="cart-empty">Your cart is empty!</div>
                    }
                <div className="cart-page-container">
                    {cart.length !== 0 ?
                        cart.map(book => <CartBook book={book} key={book.id}/>)
                        :
                        null
                    }
                    {cart.length !== 0 ?
                    <div className="cart-total-container">
                        <div className="cart-total">
                            <p className="user-icon-container"><FontAwesomeIcon icon={faShoppingCart} className="user-icon" /></p>
                            <span className="quantity-info">
                                total price {totalResult.toFixed(2)}
                            </span>
                        </div>
                        <button className="cart-purchase-button" onClick={handleCheckout}>
                            Purchase
                        </button>
                    </div>
                        : null
                    }
                </div>
            </div>
        </section>
    )
}