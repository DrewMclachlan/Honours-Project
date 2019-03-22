import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Button
} from 'reactstrap';
import {Link} from "react-router-dom";

export default class Example extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand style={{color:"lightblue"}} href="/">Real Time Web App</NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink> <Button  color="danger" tag={Link} to ="/">Sign out</Button></NavLink>
                        </NavItem>
                    </Nav>

                </Navbar>
            </div>
        );
    }
}