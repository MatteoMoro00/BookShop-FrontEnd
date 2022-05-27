import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchAsyncNewReleaseBook, bookActions } from "../../store/bookSlice";
import { Carousel } from 'react-bootstrap';
import './hero.css';

const Hero = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [book, setBook] = useState({});

    useEffect(() => {              
        dispatch(fetchAsyncNewReleaseBook());
        axios.get("http://localhost:8080/books/new")
        .then(response => {
            setBook(response.data);                                                                      
        });
    }, []);

    return (
        <section className="hero-section">
            <div className="container container-hero">
                <div className="row">
                    <div className="col-sm-8">
                        <Carousel>
                            <Carousel.Item>
                                <img className="hero-img d-block w-100" src="../asset/banner1.png" alt="First slide"/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="hero-img d-block w-100" src="./asset/banner2.png" alt="First slide"/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="hero-img d-block w-100" src="./asset/banner3.png" alt="First slide"/>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="col-sm-4">
                    <div className="card hero-card">
                            <div className="row no-gutters">
                                <div className="col-sm-5">
                                    <img className="card-img" src={`./asset/${props.book.image}`} alt={"book cover of " + props.book.title}/>
                                </div>
                                <div className="col-sm-7">
                                    <div className="card-body">
                                        <span className="badge badge-danger">New Release</span>
                                        <h5 className="hero-card-title">{props.book.title}</h5>
                                        <p className="hero-card-text">{props.book.price} $</p>
                                        <button className="new-release-button" onClick={() => {
                                            dispatch(bookActions.setBook(props.book)); 
                                            navigate("/books/" + props.book.id);}}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;