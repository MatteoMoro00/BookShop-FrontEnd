import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './addGenre.css';
import {Modal, Button} from 'react-bootstrap';
import { fetchAsyncGenres, addGenre } from "../../store/genreSlice";
import {genresSelector, genreActions} from '../../store/genreSlice';
import { showModalActions } from "../../store/showModalSlice";

export default function AddGenre(props) {
    const dispatch = useDispatch();
    const listGenres = useSelector(genresSelector);
    const genre = useSelector((state) => state.genres.genre);
    const show = useSelector((state) => state.showModal.showModalGenre);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        dispatch(fetchAsyncGenres());
    }, [dispatch]);

    
    const handleClose = () => {
        dispatch(showModalActions.closeModalGenre());
        dispatch(genreActions.setInitialGenre());
        setDisableButton(false);
    };

    const handleShow = () => {
        dispatch(showModalActions.openModalGenre());
    };

    const insertGenre = (event) => {
        event.preventDefault();
        console.log(genre);
        dispatch(addGenre(genre));
    }

    const insertGenreSubmit = (event) => {
        insertGenre(event);
        handleClose();
    };

    const handleFieldChange = event => {
        const { name, value } = event.target;
        dispatch(genreActions.setGenre({...genre, [name]: value}));
    };
 
    const genreArray = listGenres.genres;
    let checkExists = () => {
        let newGenreArray = genreArray.some((item) => item.genreName === genre.genreName)
        console.log(newGenreArray);
        if (newGenreArray) {
            setDisableButton(true);
        }
    }

    return (
        <div className="add-genre-container">
            <div className="open-button-container" >
                <button className="btn-txt" onClick={handleShow}>
                <div className="add-icon"></div>
                <div className="btn-txt">ADD GENRE</div>
                </button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <form onSubmit={insertGenreSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD A NEW GENRE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="add-genre-form-container modal-body mx-3"> 
                            <div className="input-name-container md-form mb-3">
                                <label htmlFor="input-name">Genre Name</label>
                                <input id="input-name" className="form-control validate" type="text" name="genreName" value={genre.genreName} 
                                    onChange={handleFieldChange} onBlur={checkExists}>
                                </input>
                                {!disableButton ? <small id="inputNameHelp" className="form-text text-muted">Genre must have a name</small> : 
                                <small id="inputNameHelp" className="error-span text-muted">Name already saved</small>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button id="bt1" variant="primary" type="submit" disabled={genre.genreName === "" || disableButton }>
                        Save Genre
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}