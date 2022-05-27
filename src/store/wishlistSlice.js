import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userAuth from "./utilities";
import { API_URL } from "./utilities";

const initialState = {
    wishlist: [],
    userBookWishlist: [{
        user: {
            id: 1
        },
        book: {
            title: "",
            author: {
                id: 1,
                firstName: "",
                lastName: ""
            },
            publicationDate: "",
            price: "",
            image: "do-androids-dream-of-electric-sheep-omnibus-1.jpg",
            isbn: "",
            publisher: {
                id: 4,
                name: ""
            },
            wishlist: false,
            genre: {
                id: 4,
                name: "Scy-fy"
            },
            description: ""
        }
    }]
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        setWishlist(state, action) {
            state.wishlist = action.payload;
        },
        addUserBookWishlist(state, action) {            
            state.userBookWishlist.push(action.payload);
        },
        addWishlist(state, action) {            
            state.wishlist.push(action.payload);
        },
        deleteWishlist(state, action) {
            state.wishlist = state.wishlist.filter((book) => book.id !== action.payload);
            state.userBookWishlist = state.userBookWishlist.filter((book) => book.id !== action.payload);
        },
        setWishlistUser(state, action) {
            state.userBookWishlist.user = action.payload;
        },
        setWishlistBook(state, action) {
            state.userBookWishlist.book = action.payload;
        },
        setUserBookWishlist(state, action) {
            state.userBookWishlist = action.payload;
        }
    }
});

export const fetchAsyncWishlists = () => {
    return (dispatch) => {
        axios.get(API_URL + "/wishlilst")
        .then(res => {
            dispatch(wishlistActions.setUserBookWishlist(res.data));
        });
    }  
};

export const getWishlistById = (id) => {
    return async (dispatch) => {
        await axios.get(API_URL + "wishlist/user?userId=" + id)
        .then(res => {
            dispatch(wishlistActions.setWishlist(res.data));
        });
    };  
};

export const insertBookIntoWishlist = (wishlist) => {
    return async (dispatch) => {
        await axios.post(API_URL + "wishlist" , wishlist)
        .then(res => {
            dispatch(wishlistActions.addUserBookWishlist(res.data));
        });
    };  
};

export const deleteBookFromWishlist = (userId, bookId) => {
    return async (dispatch) => {
        await axios.delete(API_URL + "wishlist?userId=" + userId + "&bookId=" + bookId, { headers: userAuth() })
        .then(response => {
            if (response.data === "ok") {
                dispatch(wishlistActions.deleteWishlist(bookId))
            }
        })
    }
};

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;