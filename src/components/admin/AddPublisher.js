import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './addGenre.css';
import {Modal, Button} from 'react-bootstrap';
import { fetchAsyncPublishers, addPublisher } from "../../store/publisherSlice";
import {publishersSelector, publisherActions} from '../../store/publisherSlice';
import { showModalActions } from "../../store/showModalSlice";

export default function AddPublisher(props) {
    const dispatch = useDispatch();
    const listPublisher = useSelector(publishersSelector);
    const publisher = useSelector((state) => state.publishers.publisher);
    const show = useSelector((state) => state.showModal.showModalPublisher);
    const publishers = listPublisher.publishers;
    const [disableButton, setDisableButton] = useState(false); 

    useEffect(() => {
        dispatch(fetchAsyncPublishers());
    }, [dispatch]);

    const handleClose = () => {
        dispatch(showModalActions.closeModalPublisher());
        dispatch(publisherActions.setInitialPublisher());
        setDisableButton(false);
    };
    const handleShow = () => {
        dispatch(showModalActions.openModalPublisher());
    };

    const insertPublisher = (event) => {
        event.preventDefault();
        dispatch(addPublisher(publisher));
    };

    const insertPublisherSubmit = (event) => {
        insertPublisher(event);
        handleClose();
    };

    const handleFieldChange = event => {
        const { name, value } = event.target;
        dispatch(publisherActions.setPublisher({...publisher, [name]: value}))
    };

    let validityName = () => {
        let checkValidity = publishers.some((item) => item.publisherName === publisher.publisherName);
        if (checkValidity) {
            setDisableButton(true);
        }
    };

    return (
        <div className="add-publisher-container">
            <div className="open-button-container" >
                <button className="btn-txt" onClick={handleShow}>
                <div className="add-icon"></div>
                <div className="btn-txt">ADD PUBLISHER</div>
                </button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <form onSubmit={insertPublisherSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD A NEW PUBLISHER</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="add-publisher-form-container modal-body mx-3"> 
                            <div className="input-name-container md-form mb-3">
                                <label htmlFor="input-name">Publisher Name</label>
                                <input id="input-name" className="form-control validate" type="text" name="publisherName" value={publisher.publisherName} onChange={ handleFieldChange } onBlur={validityName}></input>
                                {!disableButton ? <small id="inputNameHelp" className="form-text text-muted">Publisher must have a name</small> : 
                                <small id="inputNameHelp" className="error-span text-muted">Publisher already saved</small>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button id="bt1" variant="primary" type="submit" disabled={publisher.publisherName === "" || disableButton }>
                        Save Publisher
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}