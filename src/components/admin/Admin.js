import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncBooks } from "../../store/bookSlice";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";
import AddGenre from "./AddGenre";
import AddPublisher from "./AddPublisher";
import AdminBook from "./AdminBook";
import Pagination from "../pagination/Pagination";
import './admin.css';

const Admin = () => {
    const books = useSelector((state) => state.books.books);
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);

    useEffect(() => {
        dispatch(fetchAsyncBooks(currentPage, pageSize));
    }, [dispatch]);

    return (
        <div className="container">
            <div className="add-actions-container">
                <div className="add-others">
                    <AddGenre />
                    <AddAuthor />
                    <AddPublisher />
                </div>
                <div className="add-books">
                    <AddBook />
                </div>
            </div>
            <div className="admin-book-list">
                {books.map(book => {
                    return (
                        <AdminBook key={book.id} book={book}/>
                    )
                })}
                <Pagination />
            </div>
        </div>
    )
} 

export default Admin;