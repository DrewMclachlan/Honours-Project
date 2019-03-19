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
    DropdownItem } from 'reactstrap';

export default class Example extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/">Real Time Web App</NavbarBrand>




                </Navbar>
            </div>
        );
    }
}