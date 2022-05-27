import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncAuthors, addAuthor, authorActions } from "../../store/authorSlice";
import { authorsSelector } from '../../store/authorSlice';
import { showModalActions } from "../../store/showModalSlice";
import { Modal, Button } from 'react-bootstrap';
import './addAuthor.css';

export default function AddAuthor(props) {
    const dispatch = useDispatch();
    const listAuthors = useSelector(authorsSelector);
    const author = useSelector((state) => state.authors.author);

    useEffect(() => {
        dispatch(fetchAsyncAuthors());
    }, [dispatch]);

    const showModalAuthor = useSelector((state) => state.showModal.showModalAuthor)
    
    const handleClose = () => {
        dispatch(showModalActions.closeModalAuthor());
        dispatch(authorActions.setInitialAuthor());
        setDisableButton(false);
    };

    const handleShow = () => {
        dispatch(showModalActions.openModalAuthor())
    };

    const handleFieldChange = event => {
        const { name, value } = event.target;
        dispatch(authorActions.setAuthor({...author, [name]: value}))
    };

    const insertAuthor = (event) => {
        event.preventDefault();
        dispatch(addAuthor(author));
    };

    const insertAuthorSubmit = (event) => {
        insertAuthor(event);
        handleClose();
    };

    const [disableButton, setDisableButton] = useState(false); 

    const authorArray = listAuthors.authors;
    let checkExists = () => {
        let checkValidity = authorArray.some((item) => item.lastName === author.lastName);
        if (checkValidity) {
            setDisableButton(true);
        }
    };    

    return (
        <div className="add-author-container">
            <div className="open-button-container" >
                <button className="btn-txt" onClick={handleShow}>
                <div className="add-icon"></div>
                <div className="btn-txt">ADD AUTHOR</div>
                </button>
            </div>
            <Modal show={showModalAuthor} onHide={handleClose} centered>
                <form onSubmit={insertAuthorSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD A NEW AUTHOR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="add-author-form-container modal-body mx-3"> 
                            <div className="input-firstName-container md-form mb-3">
                                <label htmlFor="input-firstName">Author first name</label>
                                <input id="input-firstName" className="form-control validate" type="text" name="firstName" value={author.firstName} 
                                    onChange={ handleFieldChange }>
                                </input>
                                <small id="inputNameHelp" className="form-text text-muted">Author must have a first name</small>
                            </div>
                            <div className="input-lastName-container md-form mb-3">
                                <label htmlFor="input-lastName">Author last name</label>
                                <input id="input-lastName" className="form-control validate" type="text" name="lastName" value={author.lastName} 
                                    onChange={ handleFieldChange } onBlur={checkExists}>
                                </input>
                                {!disableButton ? <small id="inputLastNameHelp" className="form-text text-muted">Author must have a name</small> : 
                                <small id="inputNameHelp" className="error-span text-muted">Name already saved</small>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={author.firstName === "" || author.lastName === "" || disableButton }>
                        Save Author
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}