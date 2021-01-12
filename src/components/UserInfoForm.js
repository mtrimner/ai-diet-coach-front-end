import "flatpickr/dist/themes/dark.css";
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Flatpickr from 'react-flatpickr';


class UserInfoForm extends React.Component {
    state = { 
        sex: '',
        height: '',
        date_of_birth: ''
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onFormSubmit = (event) => {
        event.preventDefault();
        const data = { user: {
            sex: this.state.sex,
            height: this.state.height,
            date_of_birth: this.state.date_of_birth,
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
        console.log(this.state)
        return (
            <div className="card">
                <form className="card-body">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" value="male" id="sexCheckMale" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="sexCheckMale">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" value="female" id="sexCheckFemale" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                     </div>
                     <div className="mb-3 mt-3">
                        <label htmlFor="registrationEmailInput">Email</label>
                        <input type="email" name="email" className="form-control" id="registrationEmailInput" placeholder="name@example.com" value={this.state.email} onChange={this.onInputChange}/>
                    </div>
                </form>
            </div>

        )
}
}


export default UserInfoForm;