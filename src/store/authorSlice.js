import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./utilities";

const initialState = {
    authors: [],
    author: {
        firstName: "",
        lastName: ""
    } 
};

const authorSlice = createSlice({
    name: "authors",
    initialState: initialState,
    reducers: {
        setAuthors(state, action) {
            state.authors = action.payload;
        },
        addAuthor(state, action) {             
            state.authors.push(action.payload);
        },

        setAuthor(state, action) {
            state.author = action.payload;
        },
        setInitialAuthor(state) {
            state.author = {firstName: "", lastName: ""};
        },
    }
});

export const fetchAsyncAuthors = () => {
    return (dispatch) => {
        axios.get(API_URL + "authors")
        .then(res => {
            const authorsList = res.data;
            dispatch(authorActions.setAuthors(authorsList));
        });
    }  
}

export const addAuthor = (author) => {
    return async (dispatch) => {
        await axios.post(API_URL + "authors", author)
        .then(response => {
            dispatch(authorActions.addAuthor(response.data))
        })
    }
}

export const { setAuthors } = authorSlice.actions;

export const authorsSelector = (state) => state.authors;

export const authorActions = authorSlice.actions;

export default authorSlice;