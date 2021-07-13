import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';
import axios from 'axios';
import AddBillModal from './BillModal';
import Date from './Date';
import { API_URL, AUTH_HEADER } from '../constants';



const InfoCard = ({ bill }) => {
    return (
        <a href={`/bill/${bill.id}`}>
            <Card className="my-3">
                <CardBody>
                    <CardTitle tag="h5">{ bill.title }</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{ Date(bill.date) }</CardSubtitle>
                </CardBody>
            </Card>
        </a>
    );
};


const Home = () => {
    const [bills, setBills] = useState([]);
    const emptyMsg = <h4 className="my-3 text-center">You have no bills</h4>;
    const listBills = bills.map(bill => (
        <InfoCard key={bill.id} bill={bill} />
    ));

    useEffect(() => {
        const getBills = () => {
            axios
                .get(`${API_URL}bills/`, AUTH_HEADER(localStorage.getItem('token')))
                .then(res => {
                    setBills(res.data);
                }).catch(err => {
                    console.log(err.response.data);
                });
        };
        getBills();
    }, []);
    
    return (
        <Container className="col-md-6 col-lg-4">
            <Row className="px-3 mt-4">
                <h2 className="m-0">Bills</h2>
                <AddBillModal />
            </Row>
            <hr />
            {bills.length > 0 ? listBills : emptyMsg}
        </Container>
    );
};


export default Home;