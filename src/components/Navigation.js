import React, { useState } from 'react';
import {
    Container, Collapse, Navbar,
    NavbarToggler, NavbarBrand, Nav,
    NavItem, NavLink, Button
} from 'reactstrap';



const NavigationBar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const signIn =
        <>
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/">Sign-Up</NavLink>
            </NavItem>
        </>;
    const signOut =
        <NavItem>
            <Button onClick={props.signOut}>Sign Out</Button>
        </NavItem>;


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