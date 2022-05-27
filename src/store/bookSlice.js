import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userAuth from "./utilities";
import { API_URL } from "./utilities";

const initialState = {
    books: [],
    currentPage: 1,
    pageSize: 8,
    totalPages: '',
    totalElements: '',
    book: {
        title: "",
        author: {
            firstName: "",
            lastName: ""
        },
        publicationDate: "",
        price: "",
        image: "do-androids-dream-of-electric-sheep-omnibus-1.jpg",
        isbn: "",
        publisher: "",
        wishlist: false,
        genre: {
            name: ""
        },
        description: ""
    },
    searchParams : {},
    searchResult: [],
    newBook: {}
};

const bookSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        setBooks(state, action) {
            state.books = action.payload;
        },
        addBook(state, action) {       
            state.books.push(action.payload);
        },
        removeBook(state, action) {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },
        editBook(state, action) {
            state.books = state.books.filter((book => book.id !== action.payload), action.payload)
        },
        setBook(state, action) {
            state.book = action.payload;
        },
        setInitialBook(state) {
            state.book = initialState.book;
        },
        setParams(state, action) {
            state.searchParams = action.payload;
        },
        setSearchResult(state, action) {
            state.searchResult = action.payload;
        },
        setBooksFromParam(state, action) {
            state.books = {
                id: action.payload.id,
                title: action.payload.title,
                authorId: action.payload.authorId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                publicationDate: action.payload.publicationDate,
                price: action.payload.price,
                image: action.payload.image,
                isbn: action.payload.isbn,
                publisherId: action.payload.publisherId,
                publisherName: action.payload.publisherName,
                genreId: action.payload.genreId,
                genreName: action.payload.genreName,
                description: action.payload.description
            }
            console.log(state.books);
        },
        setPageable(state, action) {
            state.pageable = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setTotalElements(state, action) {
            state.totalElements = action.payload;
        }, 
        setPageSize(state, action) {
            state.pageSize = action.payload;
        },
        setNewBook(state, action) {
            state.newBook = action.payload;
        }
    }
});

export const fetchAsyncBooks = (currentPage, pageSize) => {
    const params = {
        page: currentPage - 1,
        size: pageSize
    }
    console.log(currentPage);
    return (dispatch) => {
        axios.get(API_URL + "books", { params })
        .then(res => res.data).then((data) => {
            dispatch(bookActions.setBooks(data.content));
            dispatch(bookActions.setCurrentPage(data.number + 1));
            dispatch(bookActions.setTotalPages(data.totalPages));
            dispatch(bookActions.setTotalElements(data.totalElements));                                                                     
        });
    }  
};

export const getBookById = (id) => {
    return async (dispatch) => {
        await axios.get(API_URL + "books/" + id)
        .then(res => {
            const booksList = res.data;
            dispatch(bookActions.setBook(booksList));
        });
    }
    
};

export const addBook = (book) => {
    return async (dispatch) => {
        await axios.post(API_URL + "books/admin", book, { headers: userAuth() })
        .then(response => {
            dispatch(bookActions.addBook(response.data))
        })
    }
};

export const deleteBook = (id) => {
    return async (dispatch) => {
        await axios.delete(API_URL + "books/admin/" + id, { headers: userAuth() })
        .then(response => {
            if (response.data === "ok") {
                console.log("delete book ricevuta risposta");
                dispatch(bookActions.removeBook(id))
            }
        })
    }
};

export const putBook = (book) => {
    return async (dispatch) => {
        await axios.put(API_URL + "books/admin/" + book.id, book , { headers: userAuth() })
        .then(response => {
            dispatch(bookActions.editBook(response.data))
        })
    }
};

export const searchBooksByTitleLike = (titleLike, currentPage, pageSize) => {
    const params = {
        page: currentPage - 1,
        size: pageSize
    };
    return async (dispatch) => {
        await axios.get(API_URL + "books?titleLike=" + titleLike, { params })
        .then(res => res.data).then((data) => {
            console.log(data);
            dispatch(bookActions.setBooks(data.content));
            dispatch(bookActions.setCurrentPage(data.number + 1));
            dispatch(bookActions.setTotalPages(data.totalPages));
            dispatch(bookActions.setTotalElements(data.totalElements));                                                                    
        }).catch((error) => {
            if (error.response) {
                alert("-- no books found with title " + titleLike + " --")
            }
        });    
    }  
};

export const searchBooksByAuthorId = (id) => {
    return async (dispatch) => {
        await axios.get(API_URL + "books/author?authorId=" + id)
        .then(response => {
            dispatch(bookActions.setBooks(response.data));
        }).catch((error) => {
        if (error.response) {
            alert("-- no books found with author with id: " + id + " --")
        }
        });
    }
};

export const advancedSearchBooks = (param) => {
    const params = {
        title: param.title,
        firstName: param.firstName,
        lastName: param.lastName,
        genreName: param.genreName,
        publisherName: param.publisherName,
        price: param.price,
        isbn: param.isbn,
        publicationDate: param.publicationDate
    };
    return async (dispatch) => {
        await axios.get(API_URL + "books/search", { params })
        .then(response => {
            console.log("sono response advanced: " + response);
            dispatch(bookActions.setBooks(response.data));
            dispatch(bookActions.setTotalElements(response.data.length));
            dispatch(bookActions.setPageSize(6));
            dispatch(bookActions.setTotalPages(response.data.length / 6));
        }).catch((error) => {
        if (error.response) {
            alert("-- no books found  --")
        }
        });
    }
};

export const fetchAsyncNewReleaseBook = () => {
    return (dispatch) => {
        axios.get(API_URL + "books/new")
        .then(response => {
            dispatch(bookActions.setNewBook(response.data));                                                                      
        });
    } 
};

export const booksSelector = (state) => state.books;
export const bookSelector = (state) => state.book;
export const singleBookSelector = (state) => state.singleBook;

export const bookActions = bookSlice.actions;

export default bookSlice;