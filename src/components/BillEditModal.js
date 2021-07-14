import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Button,
    Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { API_URL, AUTH_HEADER } from '../constants';



const BillEditModal = ({ bill }) => {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState(bill);
    
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => setInputs(state => ({ ...state, [name]: value }))
        , []);
    const submit = e => {
        e.preventDefault();
        axios
            .put(`${API_URL}bills/${bill.id}/`, {
                "title": inputs.title,
                "date": inputs.date,
                "created_at" : inputs.created_at
            }, AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err.response.data);
                setError(true);
            });
    };

    return (
        <div className="d-inline ml-auto">
            <span style={{ cursor: "pointer" }} onClick={toggle}>
                    <FontAwesomeIcon icon={faPencilAlt} size="xs" /> Edit
            </span>
            <Modal isOpen={modal} toggle={toggle}>
                <Form onSubmit={submit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={inputs.title}
                                onChange={onChangeHandler}
                                id="title"
                                placeholder="Enter a title"
                                invalid={error}
                            />
                            <FormFeedback>A Bill with this title already exists.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                value={inputs.date}
                                onChange={onChangeHandler}
                                id="date"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                        <Button color="primary">Edit Bill</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}


export default BillEditModal;