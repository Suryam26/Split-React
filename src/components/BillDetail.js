import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Date from './Date';
import { Container, Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';



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


const BillDetail = (props) => {

    let history = useHistory();

    const [bill, setBill] = useState();
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


    const content =
        <>
            <BillInfo bill={bill} />
        </>;
    

    return (
        <Container className="col-md-6 col-lg-4">
            {bill ? content : <h5 className="text-center">Featching ...</h5>}
        </Container>
    );

};


export default BillDetail;