import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from '../../store/bookSlice';
import './relatedBook.css';

const RelatedBook = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const books = useSelector((state) => state.books.books);
    const related = useSelector((state) => state.relatedProduct.relatedProductsAuthor);
    const relatedFiltAuthor = related.filter((book) => book.id !== props.book.id);
    const relatedGenre = useSelector((state) => state.relatedProduct.relatedProductsGenre);
    const relatedFiltGenre = relatedGenre.filter((book) => book.id !== props.book.id && book.id!== relatedFiltAuthor.id);
    const relatedProducts = relatedFiltAuthor.concat(relatedFiltGenre);
    const relatedProductsArray = relatedProducts.filter((item, index) => {
        const b = JSON.stringify(item);
        return index === relatedProducts.findIndex(obj => {
          return JSON.stringify(obj) === b;
        });
    });

    return ( 
        <div className="related-container">
            <p className="related-title">You may also like</p>
            <hr className="my-8" />
            <div className="container">
                <div className="row">
                    {relatedProductsArray.slice(0, 3).map((book) => {
                    return (
                    <div key={book.id} className="col-sm-4">
                        <div className="card card-related-book" >
                            <div className="row no-gutters">
                                <div className="col-sm-5">
                                    <img className="img-related-book" src={`../asset/${book.image}`} alt="book cover"/>
                                </div>
                                <div className="col-sm-7">
                                    <div className="card-body related-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">{book.author.firstName}{" "}{book.author.lastName}</p>
                                        <p className="card-text">{book.genre.genreName}</p>
                                        <p className="card-text">{book.price} $</p>
                                        <div className="related-button-container">
                                            <button className="button-related-book" onClick={() => {
                                                dispatch(bookActions.setBook(book)); 
                                                navigate("/books/" + book.id); 
                                                console.log(book.id)}}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default RelatedBook;