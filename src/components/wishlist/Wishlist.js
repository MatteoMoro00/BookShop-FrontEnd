import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncBooks } from "../../store/bookSlice";
import WishlistBook from "./WishlistBook";
import './wishlist.css';

const Wishlist = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const wishlist = useSelector((state) => state.wishlist.wishlist);

    useEffect(() => {                 
        dispatch(fetchAsyncBooks(currentPage, pageSize));
    }, [dispatch]);

    return (
        <div className="container wishlist-wrapper">
            <div className="wishlist-header-container">
                <div className="wishlist-header">
                    <p className="wishlist-title">Wishlist</p>
                    <hr className="my-8" />
                </div>
            </div>
            <div className="wishlist-book-list">
                {wishlist.map(book => {
                    return (
                        <WishlistBook key={book.id} book={book} author={book.author} genre={book.genre} publisher={book.publisher}/>
                    )
                })}
            </div>
        </div>
    )
} 

export default Wishlist;