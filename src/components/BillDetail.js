import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Card, CardBody,
    CardTitle, CardSubtitle, Row, Col, CardFooter } from 'reactstrap';
import Items from './Items';
import Users from './Users';
import Date from './Date';
import BillDeleteModal from './BillDeleteModal';
import BillEditModal from './BillEditModal';
import { API_URL, AUTH_HEADER } from '../constants';



const BillInfo = ({ bill }) => {
    return (
        <Card className="my-3 shadow-sm">
            <CardBody className="text-center">
                <CardTitle tag="h3">{bill.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{Date(bill.date)}</CardSubtitle>
            </CardBody>
            <CardFooter className="text-right text-muted">
                <BillEditModal bill={bill}/>
                {' '} | {' '}
                <BillDeleteModal id={bill.id}/>
            </CardFooter>
        </Card>
    );
};


const Content = ({ bill }) => {
    const [itemsList, setItemsList] = useState(bill.items);
    const [usersList, setUsersList] = useState(bill.consumers);
    const AddItems = (newItem) => {
        let newItemsList = [...itemsList, newItem];
        setItemsList(newItemsList);
    };
    const AddUser = (newUser) => {
        let newUsersList = [...usersList, newUser];
        setUsersList(newUsersList);
    };

    return (
        <>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 0 }}>
                <BillInfo bill={bill} />
                <Items
                    itemsList={itemsList}
                    addItems={AddItems}
                    id={bill.id}
                />
            </Col>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 0 }}>
                <Users
                    usersList={usersList}
                    addUser={AddUser}
                    items={itemsList}
                    id={bill.id}
                />
            </Col>
        </>
    );
};


const BillDetail = (props) => {
    let history = useHistory();
    const [bill, setBill] = useState({});

    useEffect(() => {
        const getBill = () => {
            axios
                .get(`${API_URL}bills/${props.match.params.billId}`,
                    AUTH_HEADER(localStorage.getItem('token')))
                .then(res => {
                    setBill(res.data);
                }).catch(err => {
                    history.push("/");
                });
        };
        getBill();
    }, [props.match.params.billId, history]);

    return (
        <Container>
            <Row>
                {Object.keys(bill).length === 0 && bill.constructor === Object ?
                    <h5 className="text-center">Featching ...</h5> : <Content bill={bill} />}
            </Row>
        </Container>
    );
};


export default BillDetail;