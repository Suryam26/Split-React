import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import AddItemModal from './ItemModal';
import axios from 'axios';
import ItemDeleteModal from './ItemDeleteModal';
import ItemEditModal from './ItemEditModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AUTH_HEADER } from '../constants';



const ItemCard = ({ itemURL }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(prevState => !prevState);

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);

    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);
    
    const [item, setItem] = useState({});
    useEffect(() => {
        const fetchItem = () => {
            axios.get(itemURL, AUTH_HEADER(localStorage.getItem('token')))
                .then(res => {
                    setItem(res.data);
                }).catch(err => {
                    console.log(err.response.data)
                });
        };
        fetchItem();
    }, [itemURL]);

    const dropDown =
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
            <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
                <FontAwesomeIcon icon={faEllipsisV} size="xs" />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={toggleEdit}>
                    <ItemEditModal item={item} modal={editModal} toggle={toggleEdit}/>
                </DropdownItem>
                <DropdownItem onClick={toggleDelete}>
                    <ItemDeleteModal item={item} modal={deleteModal} toggle={toggleDelete}/>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>;

    return (
        <Card className="mb-2 shadow-sm">
            <CardBody className="row mx-1">
                <div className="d-inline">{item.name}</div>
                <div className="d-inline ml-auto">Rs. {item.cost}/-</div>
                <div className="ml-2" style={{ cursor: "pointer" }}>
                    {dropDown}
                </div>
            </CardBody>
        </Card>
    );
};


const Items = ({ itemsList, addItems, id }) => {
    const emptyMsg = <div className="text-center shadow-sm p-3 bg-light rounded">No items found</div>;
    const displayList = itemsList.map(itemURL => (
        <ItemCard key={itemURL.toString()} itemURL={itemURL} />
    ));

    return (
        <>
            <Card className="my-3 shadow-sm">
                <CardBody>
                    <Row className="px-3">
                        <h2 className="m-0">Items</h2>
                        <AddItemModal billId={id} addItems={addItems}/>
                    </Row>
                    <hr />
                    {itemsList.length > 0 ? displayList : emptyMsg}
                </CardBody>
            </Card>
        </>
    );
};


export default Items;