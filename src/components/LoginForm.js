import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn, signOut } from '../actions';

class LoginForm extends React.Component {
    state = { 
        email: '',
        password: ''
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:3000/login", requestOptions)
        .then(response => response.json())
        .then(data => {
            this.props.signIn(data.user)
            localStorage.setItem("token", data.token)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="loginEmailInput">Email</label>
                        <input type="email" name="email" className="form-control" id="loginEmailInput" placeholder="name@example.com" value={this.state.email} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPasswordInput">Password</label>
                        <input type="password" name="password" className="form-control" id="loginPasswordInput" placeholder="Password" value={this.state.password} onChange={this.onInputChange}/>
                    </div>
                    <input className="btn btn-dark" type="submit" />
                </form>
            </div>
        )
    }

}

export default connect(null, { signIn, signOut })(withRouter(LoginForm));