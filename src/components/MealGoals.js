import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { fetchNutritionRecommendations } from '../actions';
import DailyTotalGoals from './DailyTotalGoals';


class MealGoals extends React.Component {

    componentDidMount() {
        if (this.props.calories === null) {
            this.props.fetchNutritionRecommendations()
        };
    };

    calorieCount = () => {
        return (this.props.calories / 4)
    }
    proteinCount = () => {
       return  (this.props.protein / 4)
    }

    carbCount = () => {
        return (this.props.carbs / 4)
    }

    fatCount = () => {
        return (this.props.fat / 4)
    }

    



    render() {
        return (
            <>
            <Row>
                <DailyTotalGoals amount={this.props.calories}/>
                <DailyTotalGoals amount={this.props.protein}/>
                <DailyTotalGoals amount={this.props.carbs}/>
                <DailyTotalGoals amount={this.props.fat}/>
            </Row>
            
            
            </>
        )
    };
};

const mapStateToProps = (state) => {
    return { calories: state.macros.calories,
             protein: state.macros.protein,
             carbs: state.macros.carbs,
             fat: state.macros.fat,
             mealCount: state.dietParams.mealsPerDay
    }
}
export default connect(mapStateToProps, {fetchNutritionRecommendations})(MealGoals);