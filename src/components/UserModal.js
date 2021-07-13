import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form,
    FormGroup, Label, Input, FormFeedback, CustomInput} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { API_URL, AUTH_HEADER } from '../constants';



const AddUserModal = ({ billId, addItems, itemList }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    
    const updateName = (e) => {
        setName(e.target.value);
    };
    const updateItem = (itemId) => {
        const newItems = items;
        const index = items.indexOf(itemId);
        if (index < 0) {
            newItems.push(itemId);
        }
        else {
            newItems.splice(index, 1);
        }
        setItems([...newItems]);
    };

    const submit = e => {
        e.preventDefault();
        axios
            .post(`${API_URL}consumers/`, {
                "name": name,
                "bill": billId,
                "items": items,
            }, AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                addItems(`${API_URL}consumers/${ res.data.id }`);
                toggle();
            }).catch(err => {
                setError(true);
            });
    };

    const selectItems = itemList.map(item => (
        <CustomInput
            key={item.id}
            type="checkbox"
            id={item.id}
            onChange={() => updateItem(item.id)}
            checked={items.includes(item.id)}
            label={item.name}
            className="my-2"
        />
    ));
    
    return (
        <div className="ml-auto">
            <Button color="success" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} /> New User
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>New User</ModalHeader>
                <Form onSubmit={submit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                onChange={updateName}
                                id="name"
                                invalid={error}
                            />
                            <FormFeedback>A User with this name already exists.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="items">Items</Label>
                            {selectItems}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">New User</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}


export default AddUserModal;