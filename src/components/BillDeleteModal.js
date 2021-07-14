import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { API_URL, AUTH_HEADER } from '../constants';



const BillDeleteModal = ({ id }) => {

    let history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const submit = e => {
        e.preventDefault();
        axios
            .delete(`${API_URL}bills/${id}/`, AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                history.push(`/home`);
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="d-inline ml-auto">
            <span style={{ cursor: "pointer" }} onClick={toggle}>
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" /> Delete
            </span>
            <Modal isOpen={modal} toggle={toggle} className="p-3">
                <Form onSubmit={submit}>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Bill?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                        <Button type="submit" color="danger">Delete</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}


export default BillDeleteModal;