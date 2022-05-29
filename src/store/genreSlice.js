import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./utilities";

const initialState = {
    genres: [],
    genre: {
        genreName: ""
    }
};

const genreSlice = createSlice({
    name: "genres",
    initialState: initialState,
    reducers: {
        setGenres(state, action) {
            state.genres = action.payload;
        },
        addGenre(state, action) {      
            state.genres.push(action.payload);
        },
        setGenre(state, action) {
            state.genre = action.payload;
        },
        setInitialGenre(state) {
            state.genre.genreName = "";
        },
    }
});

export const fetchAsyncGenres = () => {
    return (dispatch) => {
        axios.get(API_URL + "genres")
        .then(res => {
            const genresList = res.data;
            dispatch(genreActions.setGenres(genresList));
        });
    } 
};

export const addGenre = (genre) => {
    return async (dispatch) => {
        await axios.post(API_URL + "genres", genre)
        .then(response => {
            dispatch(genreActions.addGenre(response.data))
        }).catch((error) => {
            if (error.response) {
              alert("-- this genre is already saved --")
            }
        });
    }
};

export const { setGenres } = genreSlice.actions;

export const genresSelector = (state) => state.genres;

export const genreActions = genreSlice.actions;

export default genreSlice;