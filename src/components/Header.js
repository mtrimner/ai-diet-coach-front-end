import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import SignInSignOutButton from './SignInSignOutButton';
import Authorization from './Authorization';

const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="sign-in">Sign In</Nav.Link>
            <Nav.Link as={Link} to="new-diet" onClick={() => {alert("Starting a new diet will reset all current parameters. Are you sure you want to start a new diet?")}}>New Diet</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
            <Authorization />
            <Navbar.Text className="ml-3">
                Welcome <Link to="/">{props.currentUser}</Link>
            </Navbar.Text>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth.name}
}

export default connect(mapStateToProps)(Header);