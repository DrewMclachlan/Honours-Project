import React from 'react';
import {

    Navbar,

    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import {Link} from "react-router-dom";

export default class Example extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand style={{color:"lightblue"}} href="/">Real Time Social Media</NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                          <Button  color="danger" tag={Link} to ="/">Sign out</Button>
                        </NavItem>
                    </Nav>

                </Navbar>
            </div>
        );
    }
}