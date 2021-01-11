import React from 'react';
import { Link } from 'react-router-dom';
import SignInSignOutButton from './SignInSignOutButton';
import Authorization from './Authorization';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="d-flex">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/' className="nav-link">Sign In</Link>
                <Authorization />
            </div>
        </nav>
    )
}

export default Navbar;