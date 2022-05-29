import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncBooks } from "../../store/bookSlice";
import { bookActions } from '../../store/bookSlice';
import { cartActions } from "../../store/cartSlice";
import { getWishlistById, deleteBookFromWishlist } from "../../store/wishlistSlice";
import "../admin/admin.css";

const WishlistBook = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const localUser = JSON.parse(localStorage.getItem('user'));
    const cartBooks = useSelector((state) => state.cart.books);
    const alreadyInCart = JSON.stringify(cartBooks).includes(JSON.stringify(props.book));
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);

    useEffect(() => {  
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(getWishlistById(localUser.id));
    }, [dispatch]);

    const addBookToCartHandler = () => {
        dispatch(cartActions.addBookToCart(props.book));  
    };

    const deleteBookFromWishlistHandler = (id) => {
        dispatch(deleteBookFromWishlist(localUser.id, id));
        navigate("/wishlist");
    };

    return (
        <div className="row admin-book">
            <div className="col-sm-2">
                <div className="image-container">
                    <img className="image-admin" variant="top" src={`./asset/${props.book.image}`} alt={"book cover of " + props.book.title}/>
                </div>
            </div>
            <div className="col-sm-4 admin-text">
                <p className="title">{props.book.title}</p>
                <p className="author">{props.book.author.firstName} {""} {props.book.author.lastName}</p>
                <p className="genre">{props.book.genre.genreName}</p>
            </div>
            <div className="col-sm-3 admin-text">
                <p className="name-detail"><span className="decsription-text">Publication Date: </span> {props.book.publicationDate} </p>
                <p className="name-detail">{props.book.publisher.publisherName} </p>
                <p className="name-detail"><span className="decsription-text">ISBN: </span> {props.book.isbn} </p>
            </div>
            <div className="col-sm-3 buttons-wrapper">
                <div className="buttons-container">
                    <div className="cart-button-container">
                        <button className="cart-button-details" onClick={() => {
                                                                                navigate(`/books/${props.book.id}`); 
                                                                                dispatch(bookActions.setBook(props.book));
                                                                                }}>
                            DETAILS
                        </button>
                    </div>
                    <div className="wishlist-button-container">
                        <button className="wishlist-button-details" onClick={() => {deleteBookFromWishlistHandler(props.book.id )}}>
                            REMOVE FROM WISHLIST
                        </button>
                    </div>
                    <div className="cart-button-container">
                        <button className="cart-button-details" disabled={alreadyInCart} onClick={addBookToCartHandler}>
                            {!alreadyInCart ? "ADD TO CART" : "IN CART"}
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    )
}
  
export default WishlistBook;