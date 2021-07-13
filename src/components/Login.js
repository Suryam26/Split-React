import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Form, FormGroup,
    Input, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';



const Login = ({ logIn }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const updateEmail = e => {
        setEmail(e.target.value);
    };
    const updatePassword = e => {
        setPassword(e.target.value);
    };

    const submit = e => {
        e.preventDefault();
        axios
            .post(`${API_URL}account/login/`, {
                "email": email,
                "password": password
            })
            .then(res => {
                logIn(res.data.key);
            }).catch(err => {
                setError(true);
            });
    };

    const errorMsg = <h4 className="text-center text-danger">Invalid email or password</h4>;


    return (
        <Container className="col-md-6 col-lg-4">
            <div className="my-4">
                <Card className="shadow p-md-3 mb-5">

                    <CardBody>

                        <CardTitle className="text-center" tag="h2">Log In</CardTitle>

                        {error ? errorMsg : <></>}

                        <Form onSubmit={submit} className="my-4">
                            <FormGroup className="my-3">
                                <Input type="email" value={email} onChange={updateEmail} placeholder="Email" />
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Input type="password" value={password} onChange={updatePassword} placeholder="Password" />
                            </FormGroup>
                            <Button color="primary" block>Log In</Button>
                        </Form>

                        <hr className="my-4" />

                        <Link to="/signup" className="btn btn-success btn-block">Create New Account</Link>

                    </CardBody>

                </Card>
            </div>
        </Container>
    );
    
};


export default Login;