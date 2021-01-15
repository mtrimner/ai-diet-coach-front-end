import React from 'react';
import { connect } from 'react-redux';
import { fetchNutritionRecommendations } from '../actions'
import MealGoals from '../components/MealGoals'

class Dashboard extends React.Component {

    // componentDidMount() {
    //     console.log(this.props.calories)
    //     if (this.props.calories === null) {
    //         this.props.fetchNutritionRecommendations()
    //     }
    // }
    render() {
        return (
            
                <MealGoals />
            
        )
    }
}

// const mapStateToProps = (state) => {
//     return { calories: state.macros.calories }
// }
export default Dashboard;