import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: "showModal",
    initialState: {
        show: false,
        showModalBook: false,
        showModalAuthor: false,
        showModalGenre: false,
        showModalPublisher: false
    },
    reducers: {
        open(state) {
            state.show = true;
        },
        close(state) {
            state.show = false;
        },
        openModalBook(state) {
            state.showModalBook = true;
        },
        closeModalBook(state) {
            state.showModalBook = false;
        },
        openModalAuthor(state) {
            state.showModalAuthor = true;
        },
        closeModalAuthor(state) {
            state.showModalAuthor = false;
        },
        openModalGenre(state) {
            state.showModalGenre = true;
        },
        closeModalGenre(state) {
            state.showModalGenre = false;
        },
        openModalPublisher(state) {
            state.showModalPublisher = true;
        },
        closeModalPublisher(state) {
            state.showModalPublisher = false;
        }
    },
});

export const showModalActions = showModalSlice.actions;

export default showModalSlice;