import "flatpickr/dist/themes/dark.css";
import React from 'react';
import {withRouter} from 'react-router-dom';
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
            [event.target.name]: event.target.value,
        });
    }


    onFormSubmit = (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const data = { user: {
            sex: this.state.sex,
            height: this.state.height,
            date_of_birth: this.state.date_of_birth
            }
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        fetch(`http://localhost:3000/users/${this.props.userId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.props.signIn(data)
            this.props.history.push("/new-diet")
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" value="male" id="sexCheckMale" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="sexCheckMale">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" value="female" id="sexCheckFemale" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="sexCheckFemale">
                            Female
                        </label>
                     </div>
                     <div className="mt-3 mb-3">
                        <Flatpickr 
                            data-input
                            options={{altInput: true, wrap: true, altInputClass: "hide form-control"}}
                            onChange={date => {this.setState({date_of_birth: date[0]})}}
                        >
                        <label htmlFor="dateOfBirth">Birthdate</label>
                        <input type="text" name="date_of_birth" id="dateOfBirth" placeholder="Birthday" className="form-control" data-input onChange={this.onInputChange}/>
                        </Flatpickr> 
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="heighSelect">Height</label>
                        <select className="form-control form-select" name="height" id="heightSelect" onChange={this.onInputChange}>
                            <option defaultValue>Select Height</option>
                            <option value="58">4' 10"</option>
                            <option value="59">4' 11"</option>
                            <option value="60">5' 0"</option>
                            <option value="61">5' 1"</option>
                            <option value="62">5' 2"</option>
                            <option value="63">5' 3"</option>
                            <option value="64">5' 4"</option>
                            <option value="65">5' 5"</option>
                            <option value="66">5' 6"</option>
                            <option value="67">5' 7"</option>
                            <option value="68">5' 8"</option>
                            <option value="69">5' 9"</option>
                            <option value="70">5' 10"</option>
                            <option value="71">5' 11"</option>
                            <option value="72">6' 0"</option>
                            <option value="73">6' 1"</option>
                            <option value="74">6' 2"</option>
                            <option value="75">6' 3"</option>
                            <option value="76">6' 4"</option>
                            <option value="77">6' 5"</option>
                            <option value="78">6' 6"</option>
                            <option value="79">6' 7"</option>
                        </select>
                    </div>
                    <input className="btn btn-dark" type="submit" />
                </form>
            </div>

        )
    }
}
    


const mapStateToProps = (state) => {
    return {userId: state.auth.userId}
}

export default connect(mapStateToProps, { signIn })(withRouter(UserInfoForm));