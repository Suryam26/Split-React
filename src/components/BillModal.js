import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
    Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form,
    FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



const AddBillModal = () => {

    let history = useHistory();
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState({
        title: "",
        date: "",
    });
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => setInputs(state => ({ ...state, [name]: value }))
        , []);
    
    const submit = e => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/bills/', {
                "title": inputs.title,
                "date": inputs.date
            },
            {
                'headers': {
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            }
            )
            .then(res => {
                history.push(`/bill/${res.data.id}`);
            }).catch(err => {
                setError(true);
            });
    };


    return (
        <div className="ml-auto">

            <Button color="success" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} /> New Bill
            </Button>
            
            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle}>New Bill</ModalHeader>

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
                        <Button color="primary">Add Bill</Button>
                    </ModalFooter>
                </Form>

            </Modal>

        </div>
    );

}


export default AddBillModal;