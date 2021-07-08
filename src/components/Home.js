import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Date from './Date';
import {
    Container, Card, CardBody,
    CardTitle, CardSubtitle, Row
} from 'reactstrap';
import AddBillModal from './BillModal';



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
    const getBills = () => {
        axios
            .get('http://127.0.0.1:8000/bills/', {
                'headers': {
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                setBills(res.data);
            }).catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getBills();
    }, []);


    const emptyMsg = <h4 className="my-3 text-center">You have no bills</h4>;
    const listBills =
        bills.map(bill => (
            <InfoCard key={bill.id} bill={bill} />
        ));
    
    
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