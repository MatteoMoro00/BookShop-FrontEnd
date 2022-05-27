import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import {  cartActions } from '../../store/cartSlice';
import { bookActions } from '../../store/bookSlice';
import './cart.css';

export function CartBook({book}) {
    const dispatch = useDispatch();

    return (
        <div className="cart-book-wrap">
            <div className="cart-book-container">
                <div className="row">
                    <div className="col-sm-2">
                        <Link to={`/books/${book.id}`} onClick={() => dispatch(bookActions.setBook(book))}>
                            <img className='book-image' src={`../asset/${book.image}`} alt="alt"/>
                        </Link>
                    </div>
                    <div className="col-sm-7">
                        <div className='book-description-container'>
                            <div className="book-info-container">
                                <Link to={`/books/${book.id}`} onClick={() => dispatch(bookActions.setBook(book))}>
                                    <p className="book-title">{book.title}</p>
                                </Link>
                                <p className="book-author">{book.author.firstName}{" "}{book.author.lastName}</p>
                            </div>
                            <div className="price-container">
                                <p className="product-price">{book.price} $ </p>
                            </div>
                        </div>
                    </div>
                    <div className="product-actions-container col-sm-3">
                        <p className="product-detail-price">{book.price} $ </p>
                        <button className="book-cart-remove" onClick={() => dispatch(cartActions.removeBookFromCart(book))}>
                            Remove
                        </button>
                    </div>  
                </div>
            </div>
            
        </div>
    );
}