import React from 'react';
import { connect } from 'react-redux';
import { fetchNutritionRecommendations, fetchMeals } from '../actions'
import MealGoals from '../components/MealGoals'
import MealCard from '../components/MealCard';

class Dashboard extends React.Component {

    componentDidMount() {
        const date = Date.now()
        this.props.fetchMeals(date)
    }

    renderMealCards() { 
        if (this.props.mealCount == null) {
            return "rendering";
        } else {
        const array = Array(this.props.mealCount).fill().map((x,i)=>i + 1)
        return array.map((int) => {
           return (
           <MealCard key={int} mealNumber={int} meal={this.props.meals[int-1]}/>
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
        mealCount: state.dietParams.mealsPerDay,
        meals: state.todaysMeals
    }
}
export default connect(mapStateToProps, { fetchMeals })(Dashboard);