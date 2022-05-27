import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTruck, faCheckCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncBooks } from "../../store/bookSlice";
import {cartActions} from '../../store/cartSlice';
import './bookDetail.css';
import { useState } from "react";
import { insertBookIntoWishlist, wishlistActions } from '../../store/wishlistSlice';
import { searchRelatedBooksByAuthorId, searchRelatedBooksByGenreId } from '../../store/relatedProductSlice';
import RelatedBook from "./RelatedBook";

const BookDetail = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const book = useSelector((state) => state.books.book);
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const localUser = JSON.parse(localStorage.getItem('user'));
    const userBookWishlist = useSelector((state) => state.wishlist.userBookWishlist);
    const cartBooks = useSelector((state) => state.cart.books);
    const alreadyInCart = JSON.stringify(cartBooks).includes(JSON.stringify(props.book));
    const [errorSpan, setErrorSpan] = useState('');
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const alreadyInWishlist = JSON.stringify(wishlist).includes(JSON.stringify(props.book));

    useEffect(() => {  
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(searchRelatedBooksByAuthorId(book.author.id));
        dispatch(searchRelatedBooksByGenreId(book.genre.id));
    }, [dispatch]);

    const addBookToCartHandler = () => {
        if (!localUser) {
            setErrorSpan("log in to add to cart");
        } else {
            dispatch(cartActions.addBookToCart(props.book));
        }
    };
    
    return (
        <div className="container">
            <div className='details-wrapper'>
                <div className="row">
                    <div className="col-sm-3 return-button-container">
                        <button className="return-button" onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faArrowLeft} /> RETURN
                        </button>
                    </div>
                </div>
                <div className="container">
                    <div className="details-container">
                        <div className="row">
                            <div className="col-sm-3 photo-container">
                                <img className="photo-details" src={`../asset/${book.image}`} alt={"book cover of " + book.title}></img>
                            </div>
                            <div className="col-sm-6 text-details-container">
                                <p className="title-detail"> {book.title} </p>
                                <p className="author-detail"> {book.author.firstName} {""} {book.author.lastName}</p>
                                <p className="genre-detail"> {book.genre.genreName} </p>
                                <p className="description-detail"> {book.description} </p>
                                <p className="name-detail">Publication Date: {book.publicationDate} </p>
                                <p className="name-detail"> {book.publisher.publisherName} </p>
                                <p className="name-detail">ISBN: {book.isbn} </p>
                            </div> 
                            <div className="col-sm-3 actions-details-container">
                                <div className="price-detail-actions-container">
                                    <div className="price-actions">
                                        <p className="">Purchase this book</p>
                                        <p className="price">{book.price}{""} $</p>
                                    </div>
                                </div>
                                <div className="actions-wrapper">
                                    <div className="admin-actions-container">
                                        <p className="delivery-text"><FontAwesomeIcon icon={faTruck} />{" "} Free delivery worldwide</p>
                                        <p className="delivery-text"><FontAwesomeIcon icon={faCheckCircle} />{" "} Available. Ready for delivery</p>
                                    </div>
                                    <div className="book-actions-container">
                                        <div className="wishlist-button-container">
                                            <button className="wishlist-button-details"
                                                    disabled={alreadyInWishlist} 
                                                    onClick={() => {
                                                        var newConfig = {...userBookWishlist, "user": localUser, "book": book};
                                                        if (!localUser) {
                                                            setErrorSpan("log in to add to wishlist");
                                                        } else {
                                                            dispatch(wishlistActions.addWishlist(book));
                                                            dispatch(insertBookIntoWishlist(newConfig));
                                                        }
                                                    }}>
                                                    {!alreadyInWishlist ? "ADD TO WISHLIST" : <FontAwesomeIcon icon={faHeart} className="user-icon" />}
                                            </button>
                                        </div>
                                        <div className="cart-button-container">
                                            <button disabled={alreadyInCart} onClick={addBookToCartHandler}
                                                    className="cart-button-details">
                                                {!alreadyInCart ? "ADD TO CART" : "IN CART"}
                                            </button>
                                            {errorSpan && <span className="error">{errorSpan}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-8" />
            <div className="container related-books-container">
                <div className="row">
                    <RelatedBook book={props.book} />
                </div>
            </div>
        </div>
    );
}

export default BookDetail;