import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Jumbotron>
            <h1>Welcome to Diet Automata!</h1>
            <p> An AI diet coach that creates an effective and accurate diet plan based on the most up to date research.</p>
            <p>
                <Link to="/sign-up"><Button variant="primary">Sign Up</Button></Link>
            </p>
        </Jumbotron>
    );
};

export default LandingPage;