import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Date from './Date';
import {
    Container, Card, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';



const InfoCard = ({bill}) => {
    return (
        <a href="/">
            <Card className="my-3">
                <CardBody>
                    <CardTitle tag="h5">{ bill.name }</CardTitle>
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


    return (
        <Container className="col-md-6 col-lg-4">
            {
                bills.map(bill => (
                    <InfoCard key={bill.id} bill={ bill }/>
                ))
            }
        </Container>
    );

};


export default Home;