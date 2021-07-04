import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
    Container, Button, Form,
    FormGroup, Input, Card,
    CardBody, CardTitle, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';



const Signup = ({ logIn }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
    });
    const onChangeHandler = useCallback(
        ({ target: { name, value } }) => setInputs(state => ({ ...state, [name]: value }))
        , []);

    const [error, setError] = useState({
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        non_field_errors: "",
    });    
    const errorMsg = <h5 className="text-center text-danger">{error.non_field_errors}</h5>
    
    const submit = e => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/account/signup/', {
                "email": inputs.email,
                "password1": inputs.password1,
                "password2": inputs.password2,
                "first_name": inputs.first_name,
                "last_name": inputs.last_name
            })
            .then(res => {
                logIn(res.data.key);
            }).catch(err => {
                setError(err.response.data);
            });
    };
    

    return (
        <Container className="col-md-6 col-lg-4">
            <div className="my-4">
                <Card className="shadow p-md-3 mb-5">

                    <CardBody>

                        <CardTitle className="text-center" tag="h2">Sign Up</CardTitle>

                        {error.non_field_errors ? errorMsg : <></>}

                        <Form onSubmit={submit} className="my-4">
                            <FormGroup className="my-3">
                                <Input
                                    type="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={onChangeHandler}
                                    placeholder="Email"
                                    invalid={error.email ? true : false}
                                />
                                <FormFeedback>{error.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Input
                                    type="text"
                                    name="first_name"
                                    value={inputs.first_name}
                                    onChange={onChangeHandler}
                                    placeholder="First Name"
                                    invalid={error.first_name ? true : false}
                                />
                                <FormFeedback>{error.first_name}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Input
                                    type="text"
                                    name="last_name"
                                    value={inputs.last_name}
                                    onChange={onChangeHandler}
                                    placeholder="Last Name"
                                    invalid={error.last_name ? true : false}
                                />
                                <FormFeedback>{error.last_name}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Input
                                    type="password"
                                    name="password1"
                                    value={inputs.password1}
                                    onChange={onChangeHandler}
                                    placeholder="Password"
                                    invalid={error.password1 ? true : false}
                                />
                                <FormFeedback>{error.password1}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Input
                                    type="password"
                                    name="password2"
                                    value={inputs.password2}
                                    onChange={onChangeHandler}
                                    placeholder="Confirm Password"
                                    invalid={error.password2 ? true : false}
                                />
                                <FormFeedback>{error.password2}</FormFeedback>
                            </FormGroup>
                            <Button color="success" block>Sign Up</Button>
                        </Form>

                        <hr className="my-4" />
                        
                        <h5 className="text-center">
                            Already have an account? <Link to="/login">Login</Link>
                        </h5>

                    </CardBody>

                </Card>
            </div>
        </Container>
    );
    
};


export default Signup;