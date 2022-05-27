import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncBooks, deleteBook } from "../../store/bookSlice";
import "./admin.css";
import AdminBookEdit from "./AdminBookEdit";

const AdminBook = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);

    useEffect(() => {  
        dispatch(fetchAsyncBooks(currentPage, pageSize));
    }, [dispatch]);

    const deleteBookHandler = (event) => {
        dispatch(deleteBook(props.book.id));
        navigate("/admin");
    };

    return (
        <div className="row admin-book">
            <div className="col-sm-2">
                <div className="image-container">
                    <img className="image-admin" variant="top" src={`./asset/${props.book.image}`} alt={"book cover of " + props.book.title}/>
                </div>
            </div>
            <div className="col-sm-4 admin-text">
                <p className="title"><span className="decsription-text">Title: </span> {props.book.title}</p>
                <p className="author"><span className="decsription-text">Author: </span> {props.book.author.firstName} {""} {props.book.author.lastName}</p>
                <p className="genre"><span className="decsription-text">Genre: </span> {props.book.genre.genreName}</p>
            </div>
            <div className="col-sm-3 admin-text">
                <p className="name-detail"><span className="decsription-text">Publication Date: </span> {props.book.publicationDate} </p>
                <p className="name-detail"><span className="decsription-text">Publisher: </span> {props.book.publisher.publisherName} </p>
                <p className="name-detail"><span className="decsription-text">ISBN: </span> {props.book.isbn} </p>
            </div>
            <div className="col-sm-3 buttons-wrapper">
                <div className="buttons-container">
                    <div className="wishlist-button-container">
                        <AdminBookEdit book={props.book} />
                    </div>
                    <div className="cart-button-container">
                        <button className="cart-button-details" onClick={() => deleteBookHandler(props.book.id)}>
                            DELETE
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    )
}
  
export default AdminBook;