import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookActions } from '../../store/bookSlice';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions, insertBookIntoWishlist } from "../../store/wishlistSlice";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './book.css';

const Book = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartBooks = useSelector((state) => state.cart.books);
    const alreadyInCart = JSON.stringify(cartBooks).includes(JSON.stringify(props.book));
    const [errorSpan, setErrorSpan] = useState('');
    const localUser = JSON.parse(localStorage.getItem('user'));
    const userBookWishlist = useSelector((state) => state.wishlist.userBookWishlist);
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const alreadyInWishlist = JSON.stringify(wishlist).includes(JSON.stringify(props.book));

    const addBookToCartHandler = () => {
        if (!localUser) {
            setErrorSpan("log in to purchase");
        } else {
            dispatch(cartActions.addBookToCart(props.book));
            console.log(props.book);
        }
    };

    const addBookToWishlistHandler = (newConfig) => {
        if (!localUser) {
            setErrorSpan("log in to add to wishlist");
        } else {
            dispatch(insertBookIntoWishlist(newConfig));
            dispatch(wishlistActions.addWishlist(props.book));
        }
    };

    return (
        <div className="col-sm-3"> 
            <Card className="card-container" role="button" onClick={() => {
                                            dispatch(bookActions.setBook(props.book));
                                        }}>
                <div onClick={() => {
                    navigate(`/books/${props.book.id}`); 
                    dispatch(bookActions.setBook(props.book));
                    }}>                                
                    <div className="image-container"></div>
                    <img className="image" variant="top" src={`./asset/${props.book.image}`} alt={"book cover of " + props.book.title}/>
                    <Card.Body>
                        <p className="title">{props.book.title}</p>
                        <p className="author">{props.book.author.firstName} {""} {props.book.author.lastName}</p>
                        <p className="genre">{props.book.genre.genreName}</p>
                        <p className="description">{props.book.description.substring(0, 150)}...</p>
                        <p>{props.book.price} $</p>
                    </Card.Body>
                </div>
                <Card.Body>
                    <button className="wishlist-button" disabled={alreadyInWishlist} onClick={() => {
                                                                                                var newConfig = {...userBookWishlist, "user": localUser, "book": props.book};
                                                                                                addBookToWishlistHandler(newConfig);
                                                                                            }}>
                        {!alreadyInWishlist ? "ADD TO WISHLIST" : <FontAwesomeIcon icon={faHeart} className="user-icon" />}</button>
                    <button className="cart-button" disabled={alreadyInCart} onClick={addBookToCartHandler}>{!alreadyInCart ? "PURCHASE" : "IN CART"}</button>
                    {errorSpan && <span className="error">{errorSpan}</span>}                                                                        
                </Card.Body>
            </Card>
        </div>   
    );
};

export default Book;