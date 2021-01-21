import React from 'react';
import { connect } from 'react-redux';
import { fetchMeals, getUserWeights, submitWeight } from '../actions'
import MealGoals from '../components/MealGoals'
import MealCard from '../components/MealCard';
import WeightChart from '../components/WeightChart';
import EnterWeightModal from '../components/EnterWeightModal';

class Dashboard extends React.Component {

    state = {showModal: false}

    componentDidMount() {
        const date = Date.now()
        this.props.fetchMeals(date)
        this.props.getUserWeights()
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    handleSubmit = (weight) => {

        this.props.submitWeight(weight)
    }

    renderMealCards() { 
        if (this.props.mealCount == null) {
            return "rendering";
        } else {
        const array = Array(this.props.mealCount).fill().map((x,i)=>i + 1)
        return array.map((int) => {
           return (
           <MealCard key={int} mealNumber={int} meal={this.props.meals[int-1]} variant="info"/>
           )
        })
        }
    }
    
    render() {
        
        return (
            <>
            <MealGoals />
            {this.renderMealCards()}
            <EnterWeightModal show={this.state.showModal} handleShow={this.handleShow} handleClose={this.handleClose} handleSubmit={this.handleSubmit} />
            <WeightChart weight={this.props.weight}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mealCount: state.dietParams.mealsPerDay,
        meals: state.todaysMeals,
        weight: state.userWeights
    }
}
export default connect(mapStateToProps, { fetchMeals, getUserWeights, submitWeight })(Dashboard);