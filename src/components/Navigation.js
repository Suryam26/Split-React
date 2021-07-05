import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Collapse, Navbar,
    NavbarToggler, NavbarBrand, Nav,
    NavItem, NavLink, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'



const NavigationBar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [username, setUsername] = useState("");    
    const fetchUsername = () => {
        axios
            .get('http://127.0.0.1:8000/account/user/', {
                'headers': {
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                setUsername(res.data.first_name);
            }).catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (props.loggedIn) {
            fetchUsername();
        }
    }, [props.loggedIn]);


    const signIn =
        <>
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/signup">Sign-Up</NavLink>
            </NavItem>
        </>;
    const signOut =
        <>
            <NavItem>
                <NavLink>Hi, { username }</NavLink>
            </NavItem>
            <NavItem>
                <Button onClick={props.signOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                </Button>
            </NavItem>
        </>;


    return (
        <div>
            <Navbar color="dark" dark expand="md">

                <Container>

                    <NavbarBrand href="/home">SPL / T</NavbarBrand>

                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { props.loggedIn ? signOut : signIn}
                        </Nav>
                    </Collapse>

                </Container>

            </Navbar>
        </div>
    );

}


export default NavigationBar;