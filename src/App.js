import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Join from './components/user/Join';
import Register from './components/user/Register';
import BookShelf from './components/bookshelf/BookShelf';
import BookDetail from './components/bookshelf/BookDetail';
import Cart from './components/cart/Cart';
import { fetchAsyncBooks, fetchAsyncNewReleaseBook } from "./store/bookSlice";
import { booksSelector } from './store/bookSlice';
import { fetchAsyncAuthors } from './store/authorSlice';
import { fetchAsyncGenres } from './store/genreSlice';
import { fetchAsyncPublishers } from './store/publisherSlice';
import Admin from './components/admin/Admin';
import SearchBar from './components/header/SearchBar';
import SearchResult from './components/bookshelf/SearchResult';
import Wishlist from './components/wishlist/Wishlist';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const list = useSelector(booksSelector);
  const book = useSelector((state) => state.books.book);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const currentPage = useSelector((state) => state.books.currentPage);
  const pageSize = useSelector((state) => state.books.pageSize);

  useEffect(() => {      
    dispatch(fetchAsyncBooks(currentPage, pageSize));
    dispatch(fetchAsyncNewReleaseBook());
    dispatch(fetchAsyncGenres());
    dispatch(fetchAsyncAuthors());
    dispatch(fetchAsyncPublishers());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar />
        <Header />
        <Routes>
          <Route path="/join" element={<Join/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={ <BookShelf /> } />
          <Route path='/cart' element={ localUser && <Cart /> } />
          <Route path='/wishlist' element={ <Wishlist /> } />
          <Route path='/admin' element={ <Admin /> } />
          <Route path="/search" element={ <SearchResult /> } />
          <Route path="books/:id" element={ <BookDetail books={list.books} book={book} /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
