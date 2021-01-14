import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import { connect } from 'react-redux';
import { changeDiet } from '../actions';

class NewDiet extends Component {
    state = {
        goal: "",
        activity_level: "",
        start_date: "",
        end_date: "",
        meals_per_day: "",
        target_weight: "",
        current_weight: ""
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state)
    }

    onFormSubmit = (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const data = { diet: {
            goal: this.state.goal,
            activity_level: this.state.activity_level,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            meals_per_day: this.state.meals_per_day,
            target_weight: this.state.target_weight,
            user_weights_attributes: [{
                weight: this.state.current_weight,
                user_id: this.props.userId
            }]
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
            this.props.changeDiet(data)
        })
    }

    render() {
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.onFormSubmit}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="goal" value="fat_loss" id="goalSelectFatLoss" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectFatLoss">
                            Fat Loss
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="goal" value="maintain" id="goalSelectMaintain" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectMaintain">
                            Maintain
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="goal" value="muscle_gain" id="goalSelectMuscleGain" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="goalSelectMuscleGain">
                            Muscle Gain 
                        </label>
                     </div>
                     <div className="form-check mt-3">
                        <input className="form-check-input" type="radio" name="activity_level" value="sedentary" id="activitySelectSedentary" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="activitySelectSedentary">
                            Sedentary
                        </label>
                    </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="activity_level" value="mild" id="activitySelectMild" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="activitySelectMild">
                            Mild Activity
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="activity_level" value="moderate" id="activitySelectModerate" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="activitySelectModerate">
                            Moderate Activity
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="activity_level" value="heavy" id="activitySelectHeavy" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="activitySelectHeavy">
                            Heavy Activity
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="activity_level" value="very_heavy" id="activitySelectVeryHeavy" onChange={this.onInputChange}/>
                        <label className="form-check-label" htmlFor="activitySelectVeryHeavy">
                            Very Heavy Activity
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
                        <label htmlFor="mealsPerDayInput">Meals Per Day</label>
                        <input type="number" name="meals_per_day" className="form-control" id="mealsPerDayInput" placeholder="Meals Per Day" value={this.state.meals_per_day} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="currentWeightInput">Current Weight</label>
                        <input type="number" name="current_weight" className="form-control" id="currentWeightInput" placeholder="pounds" value={this.state.current_weight} onChange={this.onInputChange}/>
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
    
