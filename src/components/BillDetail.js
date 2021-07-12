import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Date from './Date';
import { Container, Card, CardBody,
    CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import Items from './Items';
import Users from './Users';



const BillInfo = ({ bill }) => {
    return (
        <Card className="my-3 shadow-sm">
            <CardBody className="text-center">
                <CardTitle tag="h3">{bill.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{ Date(bill.date) }</CardSubtitle>
            </CardBody>
        </Card>
    );
};


const Content = ({ bill }) => {

    const [itemsList, setItemsList] = useState(bill.items);
    const AddItems = (newItem) => {
        let newItemsList = [...itemsList, newItem];
        setItemsList(newItemsList);
    };

    const [usersList, setUsersList] = useState(bill.consumers);
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
                .get(`http://127.0.0.1:8000/bills/${ props.match.params.billId }`, {
                    'headers': {
                        'Authorization': "Token " + localStorage.getItem('token'),
                    }
                })
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