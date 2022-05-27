import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookActions } from '../../store/bookSlice';
import Pagination from "../pagination/Pagination";
import './searchResult.css';

const SearchResult = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector((state) => state.books.books);
    
    return (
        <section className="results">
            <div className="container result-wrapper">
                <p className="result-title">Search result</p>
                <hr className="my-8" />
                <div className="bookshelf-result-container">
                    <div className="row">
                        {list.length >= 1 ? list.map((book) => {
                        return ( 
                        <div key={book.id} className="col-sm-4">
                            <div className="card card-result-book" >
                                <div className="row no-gutters">
                                    <div className="col-sm-5">
                                        <img className="img-result-book" src={`./asset/${book.image}`} alt="book cover"/>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="result-body">
                                            <h5 className="result-card-title">{book.title}</h5>
                                            <p className="card-text">{book.author.firstName}{" "}{book.author.lastName}</p>
                                            <p className="card-text">{book.genre.genreName}</p>
                                            <p className="card-text">{book.price} $</p>
                                            <button className="button-result-book" onClick={() => {
                                                dispatch(bookActions.setBook(book)); 
                                                navigate("/books/" + book.id); 
                                                }}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                        })
                    : <p>No books matches your research params</p>}
                    </div>
                </div>
                <Pagination />
            </div>
        </section>
    );
}

export default SearchResult;