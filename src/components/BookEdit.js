import { useState, useEffect } from "react";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBooks, addBook } from "../store/bookSlice";
import {booksSelector} from '../store/bookSlice';
import {bookActions, putBook} from '../store/bookSlice';
import { fetchAsyncGenres } from "../store/genreSlice";
import {genresSelector} from '../store/genreSlice';
import { fetchAsyncAuthors } from "../store/authorSlice";
import {authorsSelector} from '../store/authorSlice';
import { fetchAsyncPublishers } from "../store/publisherSlice";
import {publishersSelector} from '../store/publisherSlice';

const BookEdit = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [book, setBook] = useState(props.book);
    const listGenres = useSelector(genresSelector);
    const listAuthors = useSelector(authorsSelector);
    const listPublishers = useSelector(publishersSelector);

    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);

    useEffect(() => {   
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(fetchAsyncGenres());
        dispatch(fetchAsyncAuthors());
        dispatch(fetchAsyncPublishers());
    }, [dispatch]);

    const handleSubmit = event => {
        console.log(book);
        dispatch(putBook(book));
        navigate("/");
    };

    const handleFieldChange = event => {
        const { name, value } = event.target;
        setBook({
            ...book, [name]: value
        });
    };
    
    const handleAuthorChange = (event) => {
        setBook({
          ...book, "author": {"id" : event.target.value}
        })
    };
    
    const handleGenreChange = (event) => {
        setBook({
          ...book, "genre": {"id" : event.target.value}
        })
    };

    const handlePublisherChange = (event) => {
        setBook({
          ...book, "publisher": {"id" : event.target.value}
        })
    };

    const handleWishlistChange = (event) => {
        setBook({
          ...book, "wishlist": event.target.checked
        });
    };

    return (
        <div className="edit-container">
            <div className="pb-4">
                <button onClick={() => navigate(`/books/${props.book.id}`)} className="btn-sm btn-outline-danger rounded">
                    Back
                </button>
            </div>
            <div className="edit-book-form-container modal-body mx-3">
                <form className="edit-book-form" onSubmit={(e) => { 
                                                e.preventDefault();
                                                handleSubmit();
                                            }}>
                    <div className="input-title-container md-form mb-3">
                        <label htmlFor="input-title">Title</label>
                        <input id="input-title" className="form-control validate" type="text" name="title" value={book.title} onChange={ handleFieldChange }></input>
                    </div>
                    <div className="input-author-container md-form mb-3">
                        <label htmlFor="input-lastname">Author</label>
                        <select id="add-modal-genre-select" value={book.author.id} onChange={ handleAuthorChange } >
                            {listAuthors.authors.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}> {item.firstName} {""} {item.lastName} </option>
                                )
                            })}    
                        </select>
                        <small id="inputNameHelp" className="form-text text-muted">book must have an author</small>
                    </div>
                    <div className="input-price-container md-form mb-3">
                        <label htmlFor="input-price">Price</label>
                        <input id="input-price" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="price" value={book.price} onChange={ handleFieldChange }></input>
                    </div>
                    <div className="input-favorite-container md-form mb-3">
                        <label htmlFor="input-pub-date">publication date</label>
                        <input id="input-pub-date" type="date" name="publicationDate" value={book.publicationDate} onChange={ handleFieldChange }></input>
                    </div>
                    <div className="input-publisher-container md-form mb-3">
                        <label htmlFor="select-publisher">Publisher</label>
                        <select id="select-publisher" value={book.publisher.id} onChange={ handlePublisherChange } >
                            {listPublishers.publishers.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}> {item.publisherName} </option>
                                )
                            })}    
                        </select>
                    </div>
                    <div className="input-image-container md-form mb-3">
                        <label htmlFor="input-image">Image cover</label>
                        <input id="input-image" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="image" value={book.image} onChange={ handleFieldChange }></input>
                    </div>
                    <div className="input-isbn-container md-form mb-3">
                        <label htmlFor="input-isbn">Isbn</label>
                        <input id="input-isbn" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="isbn" value={book.isbn} onChange={ handleFieldChange }></input>
                    </div>
                    <div className="input-wishlist-container md-form mb-3">
                        <label htmlFor="input-wishlist">add to wishlist</label>
                        <input id="input-wishlist" type="checkbox" name="wishlist" defaultChecked={book.wishlist} onChange={ handleWishlistChange }></input>
                    </div>
                    <div className="input-description-container md-form mb-3">
                        <label htmlFor="input-description">Description</label>
                        <textarea id="input-description" className="form-control validate" type="textarea" rows="4" cols="50"  aria-describedby="inputPhoneHelp" name="description" value={book.description} onChange={ handleFieldChange }></textarea>
                    </div>
                    <div className="genre-select-container mb-3">
                        <select id="add-modal-genre-select" value={book.genre.id} onChange={ handleGenreChange }>
                            {listGenres.genres.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}> {item.genreName} </option>
                                )
                            })}
                        </select>
                    </div>  
                    <div className="row p-4">
                    <button type="submit"
                        disabled={props.book.title === book.title && props.book.author.id === book.author.id && props.book.price === book.price && props.book.wishlist === book.wishlist && props.book.genre.id === book.genre.id}
                        className="btn-sm btn-outline-danger rounded"
                    >
                    Edit
                    </button>
                </div>       
                </form>           
            </div>      
        </div>
    );
}

export default BookEdit;