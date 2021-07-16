import React from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { API_URL, AUTH_HEADER } from '../constants';



const ItemDeleteModal = ({ item, modal, toggle }) => {

    const submit = e => {
        e.preventDefault();
        axios
            .delete(`${API_URL}items/${item.id}/`, AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="d-inline ml-auto">
            <FontAwesomeIcon icon={faTrashAlt} size="xs" /> Delete
            <Modal isOpen={modal} toggle={toggle} className="p-3">
                <Form onSubmit={submit}>
                    <ModalBody>
                        <h5>Are you sure you want to delete "{item.name}"?</h5>
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


export default ItemDeleteModal;