import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./utilities";

const initialState = {
    publishers: [],
    publisher: {publisherName: ""} 
};

const publisherSlice = createSlice({
    name: "genres",
    initialState: initialState,
    reducers: {
        setPublishers(state, action) {
            state.publishers = action.payload;
        },
        addPublisher(state, action) {     
            state.publishers.push(action.payload);
        },
        setPublisher(state, action) {
            state.publisher = action.payload;
        },
        setInitialPublisher(state) {
            state.publisher.publisherName = "";
        },
    }
});

export const fetchAsyncPublishers = () => {
    return (dispatch) => {
        axios.get(API_URL + "publishers")
        .then(res => {
            dispatch(publisherActions.setPublishers(res.data));
        });
    }  
};

export const addPublisher = (publisher) => {
    return async (dispatch) => {
        await axios.post(API_URL + "publishers", publisher)
        .then(response => {
            dispatch(publisherActions.addPublisher(response.data))
        })
    }
};

export const { setPublishers } = publisherSlice.actions;

export const publishersSelector = (state) => state.publishers;

export const publisherActions = publisherSlice.actions;

export default publisherSlice;