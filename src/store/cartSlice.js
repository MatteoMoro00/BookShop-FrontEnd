import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        books: [],
        quantity: 0
    },
    reducers: {
        addBookToCart(state, action) {
            if (JSON.stringify(state.books).includes(JSON.stringify(action.payload))) {
                alert("this book is already present in your cart");
            } else {
            state.books.push(action.payload);
            state.quantity++;
            }
        },
        removeBookFromCart(state, action) {
            state.books.splice(action.payload, 1);
            state.quantity--;
        }, 
        clearCart(state) {
            state.books = {};
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;