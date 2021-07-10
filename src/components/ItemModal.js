import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
    Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form,
    FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



const AddItemModal = ({ billId, addItems }) => {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        cost: "00.00",
    });
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => setInputs(state => ({ ...state, [name]: value }))
        , []);
    
    const submit = e => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/items/', {
                "name": inputs.name,
                "cost": inputs.cost,
                "bill": billId
            },
            {
                'headers': {
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            }
            )
            .then(res => {
                addItems(`http://127.0.0.1:8000/items/${ res.data.id }`);
                toggle();
            }).catch(err => {
                setError(true);
            });
    };


    return (
        <div className="ml-auto">

            <Button color="success" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} /> New Item
            </Button>
            
            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle}>New Item</ModalHeader>

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
                        <Button color="primary">Add Item</Button>
                    </ModalFooter>
                </Form>

            </Modal>

        </div>
    );

}


export default AddItemModal;