import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./utilities";

const initialState = {
    relatedProductsAuthor: [],
    relatedProductsGenre: []
};

const relatedProductSlice = createSlice({
    name: "relatedProduct",
    initialState: initialState,
    reducers: {
        relatedProductsAuthor(state, action) {
            state.relatedProductsAuthor = action.payload;
            state.relatedProductsAuthor = state.relatedProductsAuthor.filter((book) => book.id !== action.payload, action.payload);
        },
        relatedProductsGenre(state, action) {
            state.relatedProductsGenre = action.payload;
        }
    }
});

export const searchRelatedBooksByAuthorId = (id) => {
    return async (dispatch) => {
        await axios.get(API_URL + "books/author?authorId=" + id)
        .then(response => {
            dispatch(relatedProductActions.relatedProductsAuthor(response.data));
        }).catch((error) => {
        if (error.response) {
            alert("-- no books found with author id: " + id + " --")
        }
        });
    }
};

export const searchRelatedBooksByGenreId = (id) => {
    return async (dispatch) => {
        await axios.get(API_URL + "books/genre?genreId=" + id)
        .then(response => {
            dispatch(relatedProductActions.relatedProductsGenre(response.data));
        }).catch((error) => {
        if (error.response) {
            alert("-- no books found with genre id: " + id + " --")
        }
        });
    }
};

export const relatedProductActions = relatedProductSlice.actions;

export default relatedProductSlice;