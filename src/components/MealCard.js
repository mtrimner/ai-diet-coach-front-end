import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { fetchNutritionRecommendations } from '../actions';
import MealInfo from './MealInfo';

class MealCard extends React.Component {

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
                    <Row>
                        <Col>
                            <MealInfo macro={this.calorieCount()}/>
                        </Col>
                        <Col>
                            <MealInfo macro={this.proteinCount()}/>
                        </Col>
                        <Col>
                            <MealInfo macro={this.carbCount()}/>
                        </Col>
                        <Col>
                        <MealInfo macro={this.fatCount()}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
           
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

export default connect(mapStateToProps, {fetchNutritionRecommendations})(withRouter(MealCard));