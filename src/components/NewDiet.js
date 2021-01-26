import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import { connect } from 'react-redux';
import { changeDiet } from '../actions';

class NewDiet extends Component {
    state = {
        fields: {
            goal: "",
            activity_level: "",
            start_date: "",
            end_date: "",
            meals_per_day: "",
            target_weight: "",
            current_weight: ""
        },
        errors: {}
    }

    onInputChange = event => {
        this.setState({
          fields: {...this.state.fields, [event.target.name]: event.target.value}
        });

        console.log(this.state)
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        if(!this.handleValidation()){
            for (const [key, value] of Object.entries(this.state.errors)) {
               return  alert(`${key}: ${value}`);
            }
        } else {
        const token = localStorage.getItem("token")
        const data = { diet: {
            goal: this.state.fields.goal,
            activity_level: this.state.fields.activity_level,
            start_date: this.state.fields.start_date,
            end_date: this.state.fields.end_date,
            meals_per_day: this.state.fields.meals_per_day,
            target_weight: this.state.fields.target_weight,
            user_weights_attributes: [{
                weight: this.state.fields.current_weight,
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
            this.props.history.push('/')
        })
        }
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(fields["goal"] === "" || !fields["goal"]){
            formIsValid = false;
            errors["goal"] = "Must select a goal"
        }

        if(fields["activity_level"] === "" || !fields["activity_level"]){
            formIsValid = false;
            errors["activity_level"] = "Must select an activity level"
        }

        if(fields["start_date"] === "" || !fields["start_date"]){
            formIsValid = false;
            errors["start_date"] = "Must select a start_date"
        }

        if(fields["end_date"] === "" || !fields["end_date"]){
            formIsValid = false;
            errors["end_date"] = "Must select an end date"
        }

        if(fields["meals_per_day"] === "" || !fields["meals_per_day"]){
            formIsValid = false;
            errors["meals_per_day"] = "Meals per day cannot be blank"
        }

        if(fields["current_weight"] === "" || !fields["current_weight"]){
            formIsValid = false;
            errors["current_weight"] = "Must select a current weight"
        }

        if(fields["target_weight"] === "" || !fields["target_weight"]){
            formIsValid = false;
            errors["target_weight"] = "Must select a target weight"
        }
        this.setState({errors: errors})
        return formIsValid
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
                            onChange={date => {this.setState({fields: {...this.state.fields, start_date: date[0]}})}}
                        >
                        <label htmlFor="startDate">Diet Start Date</label>
                        <input type="date" name="start_date" id="start_date" placeholder="Diet Start Date" className="form-control" data-input/>
                        </Flatpickr> 
                    </div> 
                    <div className="mt-3 mb-3">
                        <Flatpickr 
                            data-input
                            options={{altInput: true, wrap: true, altInputClass: "hide form-control"}}
                            onChange={date => {this.setState({fields: {...this.state.fields, end_date: date[0]}})}}
                        >
                        <label htmlFor="endDate">Diet End Date</label>
                        <input type="date" name="end_date" id="end_date" placeholder="Diet End Date" className="form-control" data-input/>
                        </Flatpickr> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mealsPerDayInput">Meals Per Day</label>
                        <input type="number" name="meals_per_day" className="form-control" id="mealsPerDayInput" placeholder="Meals Per Day" value={this.state.fields.meals_per_day} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="currentWeightInput">Current Weight</label>
                        <input type="number" name="current_weight" className="form-control" id="currentWeightInput" placeholder="pounds" value={this.state.fields.current_weight} onChange={this.onInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="targetWeightInput">Target Weight</label>
                        <input type="number" name="target_weight" className="form-control" id="targetWeightInput" placeholder="pounds" value={this.state.fields.target_weight} onChange={this.onInputChange}/>
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
    
