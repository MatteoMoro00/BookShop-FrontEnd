import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookActions, searchBooksByTitleLike, advancedSearchBooks, fetchAsyncBooks } from '../../store/bookSlice';
import { fetchAsyncAuthors } from "../../store/authorSlice";
import { fetchAsyncGenres } from "../../store/genreSlice";
import { fetchAsyncPublishers } from "../../store/publisherSlice";
import { showModalActions } from "../../store/showModalSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Modal, Button} from 'react-bootstrap';
import './searchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.books);
    const [titleLikes, setTitleLikes] = useState("");
    const listGenres = useSelector((state) => state.genres.genres);
    const listPublishers =  useSelector((state) => state.publishers.publishers);
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const show = useSelector((state) => state.showModal.show);
    const searchResult = useSelector((state) => state.books.searchResult);
    const emptySearchConfig = {
        title: "",
        author: {
            firstName: "",
            lastName: ""
        },
        publicationDate: null,
        price: null,
        isbn: null,
        publisher: {
            publisherName: ""
        },
        genre: {
            genreName: ""
        }
    }; 
    const [searchConfig, setSearchConfig] = useState(emptySearchConfig);  

    useEffect(() => {                 
        dispatch(fetchAsyncBooks(currentPage, pageSize));
        dispatch(fetchAsyncGenres());
        dispatch(fetchAsyncAuthors());
        dispatch(fetchAsyncPublishers());
    }, [dispatch]);
    
    const handleClose = () => {
                        dispatch(showModalActions.close());
                        dispatch(bookActions.setInitialBook());
                        };

    const handleShow = () => {
                        dispatch(showModalActions.open());
                        };

    const handleSearch = event => {
        event.preventDefault();
        if (titleLikes === "") {
            return null;
        } else {
            dispatch(searchBooksByTitleLike(titleLikes, currentPage, pageSize));
            setTitleLikes("");
            navigate("/");
        }
    };

    const handleFieldChange = event => {
        const { name, value } = event.target;
        setSearchConfig({...searchConfig, [name]: value});
    };

    const handlePublisherChange = (event) => {
        setSearchConfig({...searchConfig, "publisherName": event.target.value});
    };
    
    const handleGenreChange = (event) => {
        setSearchConfig({...searchConfig, "genreName": event.target.value});
    };

    const handleAdvancedSearch = event => {
        event.preventDefault();
        dispatch(advancedSearchBooks(searchConfig));
        navigate("/search");
        setSearchConfig(emptySearchConfig);
        handleClose();
    };

    return (
        <div className="header-wrap">
            <header className="header">
                <div className="primary-wrap">
                    <div className="brand-wrap">
                        <div className="logo-container" onClick={() => {dispatch(bookActions.setPageSize(8));
                                                                        dispatch(bookActions.setTotalPages(books.length / 8));
                                                                        dispatch(bookActions.setCurrentPage(1));
                                                                        navigate("/")}}>
                        </div>                         
                    </div>
                    <div className="search-wrap">
                        <p className="search-icon"><FontAwesomeIcon icon={faSearch} className="search-icon" /></p>
                        <input type="text" placeholder="Search books by title" className="text-input" 
                            name="search" value={titleLikes} onChange={(event) => {setTitleLikes(event.target.value)}}>
                        </input>
                        <button onClick={handleSearch} aria-label="Search" className="header-search-btn" type="submit">
                            <span className="text">Search</span>
                        </button>
                        <button aria-label="Search" onClick={handleShow} className="header-advanced-search-btn" type="submit">
                            <span>Advanced Search</span>
                        </button>
                        <Modal show={show} onHide={handleClose} centered>
                            <form onSubmit={handleAdvancedSearch}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Advanced Search</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="add-book-form-container modal-body mx-3">
                                        <div className="input-title-container md-form mb-3">
                                            <label htmlFor="input-title">Title</label>
                                            <input id="input-title" className="form-control validate" type="text" name="title" value={searchResult.title} onChange={ handleFieldChange }></input>
                                        </div>
                                        <div className="input-author-container md-form mb-3">
                                            <label htmlFor="input-firstname">Author</label>
                                            <input id="input-firstname" className="form-control validate" type="text" name="firstName" value={searchResult.firstName} onChange={ handleFieldChange }></input>
                                            <input id="input-firstname" className="form-control validate" type="text" name="lastName" value={searchResult.lastName} onChange={ handleFieldChange }></input>
                                        </div>
                                        <div className="genre-select-container mb-3">
                                            <select id="add-modal-genre-select" value={searchResult.genreName} onChange={ handleGenreChange }>
                                                <option value={true}> Choose genre</option>
                                                {listGenres.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.genreName}> {item.genreName} </option>
                                                    )
                                                })}
                                            </select>
                                        </div> 
                                        <div className="input-price-container md-form mb-3">
                                            <label htmlFor="input-price">Price less than</label>
                                            <input id="input-price" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="price" value={searchResult.price} onChange={ handleFieldChange }></input>
                                        </div>
                                        <div className="input-pub-date-container md-form mb-3">
                                            <label htmlFor="input-pub-date">publication date</label>
                                            <input id="input-pub-date" type="date" name="publicationDate" value={searchResult.publicationDate} onChange={ handleFieldChange }></input>
                                        </div>
                                        <div className="input-publisher-container md-form mb-3">
                                            <label htmlFor="input-publisher">Publisher</label>
                                            <select id="add-modal-publisher-select" value={searchResult.publisherName} onChange={ handlePublisherChange } >
                                                <option value={true}> Choose publisher</option>
                                                {listPublishers.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.publisherName}> {item.publisherName} </option>
                                                    )
                                                })}    
                                            </select>
                                        </div>
                                        <div className="input-isbn-container md-form mb-3">
                                            <label htmlFor="input-isbn">Isbn</label>
                                            <input id="input-isbn" className="form-control validate" type="text" aria-describedby="inputPhoneHelp" name="isbn" value={searchResult.isbn} onChange={ handleFieldChange }></input>
                                        </div> 
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                    Close
                                    </Button>
                                    <Button variant="primary" type="submit" >
                                    Search
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default SearchBar;