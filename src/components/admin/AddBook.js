import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBooks, addBook, booksSelector, bookActions } from "../../store/bookSlice";
import { fetchAsyncGenres, genresSelector } from "../../store/genreSlice";
import { fetchAsyncAuthors, authorsSelector } from "../../store/authorSlice";
import { fetchAsyncPublishers, publishersSelector } from "../../store/publisherSlice";
import { Modal, Button } from 'react-bootstrap';
import './addBook.css';

const AddBook = (props) => {
    const dispatch = useDispatch();

    const book = useSelector((state) => state.books.book);
    const listBooks = useSelector(booksSelector);
    const listGenres = useSelector(genresSelector);
    const listAuthors = useSelector(authorsSelector);
    const listPublishers =  useSelector(publishersSelector);
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const [show, setShow] = useState(false);
    const [disableButton, setDisableButton] = useState(false); 
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorIsbn, setErrorIsbn] = useState(false);

    useEffect(() => {                  //importantissima STUDIARE BENE-- da fare per tutti i metodi (add, delete)
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(fetchAsyncGenres());
        dispatch(fetchAsyncAuthors());
        dispatch(fetchAsyncPublishers());
    }, [dispatch]);
    
    const handleClose = () => {
                        setShow(false);
                        setErrorIsbn(false);
                        setErrorTitle(false);
                        dispatch(bookActions.setInitialBook());
                        }

    const handleShow = () => setShow(true);

    const handleFieldChange = event => {
        const { name, value } = event.target;
        dispatch(bookActions.setBook({...book, [name]: value}));
    };

    const handleAuthorChange = (event) => {
        dispatch(bookActions.setBook({...book, "author": {"id" : event.target.value}}));
    };
    
    const handleGenreChange = (event) => {
        dispatch(bookActions.setBook({...book, "genre": {"id" : event.target.value}}));
    };

    const handlePublisherChange = (event) => {
        dispatch(bookActions.setBook({...book, "publisher": {"id" : event.target.value}}));
    };

    const insertBook = (event) => {
        event.preventDefault();
        console.log(book);
        dispatch(addBook(book));
    };

    const insertBookSubmit = (event) => {
        insertBook(event);
        handleClose();
    };

    const books = listBooks.books;

    let validityTitle = () => {
        let checkValidity = books.some((item) => item.title === book.title);
        if (checkValidity) {
            setDisableButton(true);
            setErrorTitle(true);
        }
    }; 
    
    let validityISBN = () => {
        let checkValidity = books.some((item) => item.isbn === book.isbn);
        if (checkValidity) {
            setDisableButton(true);
            setErrorIsbn(true);
        }
    }; 

    return (
        <div className="add-book-container">
            <div className="open-button-container" >
                <button className="btn-txt" onClick={handleShow}>
                    <div className="add-icon"></div>
                    <div className="btn-txt">ADD BOOK</div>
                </button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <form onSubmit={insertBookSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD A NEW BOOK</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="add-book-form-container modal-body mx-3">
                            <div className="input-title-container md-form mb-3">
                                <label htmlFor="input-title">Title</label>
                                <input id="input-title" className="form-control validate" type="text" name="title" value={book.title} 
                                    onChange={ handleFieldChange } onBlur={validityTitle}>
                                </input>
                                {!errorTitle ? <small id="inputNameHelp" className="form-text text-muted">Book must have a title</small> : 
                                <small id="inputNameHelp" className="error-span text-muted">Title already saved</small>}
                            </div>
                            <div className="input-author-container md-form mb-3">
                                <label htmlFor="add-modal-author-select">Author</label>
                                <select id="add-modal-author-select" value={book.author.id} onChange={ handleAuthorChange } >
                                    <option value={true}> Choose author</option>
                                    {listAuthors.authors.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}> {item.firstName} {""} {item.lastName} </option>
                                        )
                                    })}    
                                </select>
                                <small id="inputNameHelp" className="form-text text-muted">book must have an author</small>
                            </div>
                            <div className="genre-select-container mb-3">
                            <label htmlFor="add-modal-genre-select">Genre</label>
                                <select id="add-modal-genre-select" value={book.genre.id} onChange={ handleGenreChange }>
                                <option value={true}> Choose genre</option>
                                    {listGenres.genres.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}> {item.genreName} </option>
                                        )
                                    })}
                                </select>
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
                                <label htmlFor="input-publisher-select">Publisher</label>
                                <select id="add-modal-publisher-select" value={book.publisher.id} onChange={ handlePublisherChange } >
                                    <option value={true}> Choose publisher</option>
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
                                <input id="input-isbn" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="isbn" value={book.isbn} onChange={ handleFieldChange } onBlur={validityISBN}></input>
                                {!errorIsbn ? null : <small id="inputNameHelp" className="error-span text-muted">ISBN already saved</small>}
                            </div>
                            <div className="input-description-container md-form mb-3">
                                <label htmlFor="input-description">Description</label>
                                <textarea id="input-description" className="form-control validate" type="textarea" rows="4" cols="50" aria-describedby="inputPhoneHelp" name="description" value={book.description} onChange={ handleFieldChange }></textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={ book.title === "" || errorTitle || errorIsbn || disableButton }>
                        Save Book
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default AddBook;