import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, } from 'reactstrap';
import AddItemModal from './ItemModal';
import axios from 'axios';
import { AUTH_HEADER } from '../constants';



const ItemCard = ({ itemURL }) => {
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

    return (
        <Card className="mb-2 shadow-sm">
            <CardBody className="row mx-1">
                <div className="d-inline">{item.name}</div>
                <div className="d-inline ml-auto">Rs. {item.cost}/-</div>
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