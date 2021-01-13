import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import { connect } from 'react-redux';
import { changeDiet } from '../actions';

class NewDiet extends Component {
    state = {
        goal: "",
        starting_date: "",
        end_date: "",
        target_weight: ""
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onFormSubmit = (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const data = { diet: {
            goal: this.state.sex,
            start_date: this.state.height,
            end_date: this.state.date_of_birth,
            target_weight: this.state.target_date
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
        fetch(`http://localhost:3000/diets/${this.props.userId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            debugger
            this.props.changeDiet(data)
        })
    }

    render() {
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="fat-loss" value="fat_loss" id="goalSelectFatLoss" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectFatLoss">
                            Fat Loss
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="maintain" value="maintain" id="goalSelectMaintain" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectMaintain">
                            Maintain
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="muscle-gain" value="muscle_gain" id="goalSelectMuscleGain" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectMuscleGain">
                            Muscle Gain
                        </label>
                     </div>
                     <div className="mt-3 mb-3">
                        <Flatpickr 
                            data-input
                            options={{altInput: true, wrap: true, altInputClass: "hide form-control"}}
                            onChange={date => {this.setState({start_date: date[0]})}}
                        >
                        <label htmlFor="startDate">Diet Start Date</label>
                        <input type="date" name="start_date" id="start_date" placeholder="Diet Start Date" className="form-control" data-input/>
                        </Flatpickr> 
                    </div> 
                    <div className="mt-3 mb-3">
                        <Flatpickr 
                            data-input
                            options={{altInput: true, wrap: true, altInputClass: "hide form-control"}}
                            onChange={date => {this.setState({end_date: date[0]})}}
                        >
                        <label htmlFor="endDate">Diet Start Date</label>
                        <input type="date" name="end_date" id="end_date" placeholder="Diet End Date" className="form-control" data-input/>
                        </Flatpickr> 
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="targetWeightInput">Target Weight</label>
                        <input type="number" name="target_weight" className="form-control" id="targetWeightInput" placeholder="pounds" value={this.state.target_weight} onChange={this.onInputChange}/>
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

export default connect(mapStateToProps, { changeDiet })(withRouter(NewDiet));
    
