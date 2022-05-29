import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBooks, fetchAsyncNewReleaseBook } from "../../store/bookSlice";
import Book from "./Book";
import Pagination from "../pagination/Pagination";
import Hero from "../hero/Hero";
import './bookShelf.css';

const BookShelf = (props) => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.books.books);
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const newBook = useSelector((state) => state.books.newBook);

    useEffect(() => {      
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(fetchAsyncNewReleaseBook());
    }, [dispatch]);

    return (
        <main>
            <Hero book={newBook}/>
            <section className="bookshelf">
                <div className="container">
                    <div className="bookshelf-container">
                        <h1 className="title-bookshelf">Our books</h1>
                        <hr />
                        <div className="row">
                            {list <= 0 ? 
                            <p className="error-title">no books found</p> :
                            list.map((book) => {
                                return (
                                    <Book key={book.id} book={book} />
                                ) 
                            })}
                        </div>
                        <Pagination className="pagination-bar" />                                
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BookShelf;