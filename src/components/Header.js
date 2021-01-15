import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import SignInSignOutButton from './SignInSignOutButton';
import Authorization from './Authorization';

const Header = (props) => {
    return (
        <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="sign-in">Sign In</Nav.Link>
            <Nav.Link as={Link} to="new-diet">New Diet</Nav.Link>
            <Authorization />
        </Nav>
        <Navbar.Text>
           Welcome <Link to="/">{props.currentUser}</Link>
        </Navbar.Text>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth.name}
}

export default connect(mapStateToProps)(Header);