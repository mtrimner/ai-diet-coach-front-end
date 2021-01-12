import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class RegistrationForm extends React.Component {
    state = { 
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onFormSubmit = (event) => {
        event.preventDefault();
        const data = { user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:3000/users", requestOptions)
        .then(response => response.json())
        .then(data => {
            this.props.signIn(data.user)
            localStorage.setItem("token", data.token)
        })
    }

    render() {
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" name="name" className="form-control" id="nameInput" placeholder="Name" value={this.state.name} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registrationEmailInput">Email</label>
                        <input type="email" name="email" className="form-control" id="registrationEmailInput" placeholder="name@example.com" value={this.state.email} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registrationPasswordInput">Password</label>
                        <input type="password" name="password" className="form-control" id="registrationPasswordInput" placeholder="Password" value={this.state.password} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="confirmPasswordInput">Confirm Password</label>
                    <input type="password" name="password_confirmation" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.onInputChange}/>
                    </div>
                    <input className="btn btn-dark" type="submit" />
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.auth.isSignedIn,

    }
}
export default connect(mapStateToProps, {signIn, signOut})(RegistrationForm);