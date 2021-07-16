import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Button,
    Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { API_URL, AUTH_HEADER } from '../constants';



const ItemEditModal = ({ item, modal, toggle }) => {
    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState(item);
    
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => setInputs(state => ({ ...state, [name]: value }))
        , []);
    
    const submit = e => {
        e.preventDefault();
        axios
            .put(`${API_URL}items/${item.id}/`, {
                "name": inputs.name,
                "cost": inputs.cost,
                "bill": inputs.bill
            }, AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
                setError(true);
            });
    };

    return (
        <div className="ml-auto">
            <FontAwesomeIcon icon={faPencilAlt} size="xs" /> Edit
            <Modal isOpen={modal} toggle={toggle}>
                <Form onSubmit={submit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={inputs.name}
                                onChange={onChangeHandler}
                                id="name"
                                invalid={error}
                            />
                            <FormFeedback>A Bill with this title already exists.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cost">Cost</Label>
                            <Input
                                type="number"
                                min="0"
                                step=".01"
                                name="cost"
                                value={inputs.cost}
                                onChange={onChangeHandler}
                                id="cost"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                        <Button type="submit" color="primary">Save</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}


export default ItemEditModal;