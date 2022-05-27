import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./utilities";

const initialState = {
    user: {
        username: "",
        password: ""
    },
    isLoggedIn: false,
    users: []
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setInitialUser(state) {
            state.user = initialState.user;
        },
        addUser(state, action) {   
            state.users.push(action.payload);
        },
        removeUser(state, action) {
            state.users.filter((user) => user.id !== action.payload);
        },
    },
});

export const insertUser = (user) => {
    return async (dispatch) => {
        await axios.post(API_URL + "users", user)
        .then(response => {
            dispatch(userActions.addUser(response.data));
            alert("-- success -- account registered --")
        }).catch((error) => {
            if (error.response) {
              alert("-- registration failed --")
            }
        });
    }
};

export const loginService = (user) => {
    return async (dispatch) => {
        console.log(user);
        await axios.post(API_URL + "users/login", user)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                dispatch(userActions.setUser((response.data)));
                console.log(JSON.stringify(response.data.accessToken));
            } 
            return response.data;
        });
        
    } 
};

export const logoutService = () => {
    return async (dispatch) => {
        localStorage.removeItem("user");
        dispatch(userActions.logout());
    } 
};

export const userActions = userSlice.actions;

export default userSlice;