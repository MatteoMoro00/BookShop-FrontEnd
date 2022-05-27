import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';
import genreSlice from './genreSlice';
import authorSlice from './authorSlice';
import publisherSlice from './publisherSlice';
import showModalSlice from './showModalSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import wishlistSlice from './wishlistSlice';
import relatedProductSlice from './relatedProductSlice';

const store = configureStore({
  reducer: { books: bookSlice.reducer, book: bookSlice.reducer, 
             genres: genreSlice.reducer, 
             authors: authorSlice.reducer, 
             publishers: publisherSlice.reducer, 
             showModal: showModalSlice.reducer,
             users: userSlice.reducer,
             cart: cartSlice.reducer,
             wishlist: wishlistSlice.reducer,
             relatedProduct: relatedProductSlice.reducer
            },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;