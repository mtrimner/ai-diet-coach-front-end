import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import Authorization from './Authorization';

const Header = (props) => {

    const renderHeader = () => {
        if (props.isSignedIn) {
            return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="new-diet" onClick={() => {alert("Starting a new diet will reset all current parameters. Are you sure you want to start a new diet?")}}>New Diet</Nav.Link>
        </Nav>
        <Nav >
            <Authorization />
            <Navbar.Text className="ml-3">
                Welcome <Link to="/">{props.currentUser}</Link>
            </Navbar.Text>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
            )} else {
                return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        <Nav >
            <Authorization />
        </Nav>
        </Navbar.Collapse>
        </Navbar>
                )}
    }
    return (
        renderHeader()
        // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        // <Nav className="mr-auto">
        //     <Nav.Link as={Link} to="/">Home</Nav.Link>
        //     <Nav.Link as={Link} to="new-diet" onClick={() => {alert("Starting a new diet will reset all current parameters. Are you sure you want to start a new diet?")}}>New Diet</Nav.Link>
        // </Nav>
        // <Nav >
        //     <Authorization />
        //     <Navbar.Text className="ml-3">
        //         Welcome <Link to="/">{props.currentUser}</Link>
        //     </Navbar.Text>
        // </Nav>
        // </Navbar.Collapse>
        // </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.name,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps)(Header);