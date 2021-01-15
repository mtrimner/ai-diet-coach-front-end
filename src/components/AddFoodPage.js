import React from 'react';
import { withRouter } from 'react-router-dom';
import FoodSearchBar from './FoodSearchBar';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import {fetchNutritionRecommendations} from '../actions';
import {connect} from 'react-redux';
import MealInfo from './MealInfo';

class AddFoodPage extends React.Component {

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
        return(
            <>
                <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            Meal 1
                        </Col>
                        <Col>
                        <Button variant="outline-dark" onClick={() => {this.props.history.push('/add-food')}}>Add Food</Button>
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                
                       <ProgressBar now={1000} min={0} max={2000} />
                 
                </Card.Body>
            </Card>
                <FoodSearchBar />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { calories: state.macros.calories,
             protein: state.macros.protein,
             carbs: state.macros.carbs,
             fat: state.macros.fat,
             mealCount: state.dietParams.mealsPerDay
    }
}

export default connect(mapStateToProps, {fetchNutritionRecommendations})(withRouter(AddFoodPage));