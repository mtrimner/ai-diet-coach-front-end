import React from 'react';
import { connect } from 'react-redux';
import { fetchNutritionRecommendations } from '../actions'
import MealGoals from '../components/MealGoals'
import MealCard from '../components/MealCard';

class Dashboard extends React.Component {



    renderMealCards() { 
        if (this.props.mealCount == null) {
            return "rendering";
        } else {
            <MealCard />
        const array = Array(this.props.mealCount).fill().map((x,i)=>i + 1)
        return array.map((int) => {
            console.log(int)
           return (
           <MealCard />
           )
        })
    }
    }
    
    render() {

        return (
            <>
            <MealGoals />
            {this.renderMealCards()}
            
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mealCount: state.dietParams.mealsPerDay
    }
}
export default connect(mapStateToProps)(Dashboard);