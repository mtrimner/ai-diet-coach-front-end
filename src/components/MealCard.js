import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { fetchNutritionRecommendations } from '../actions';
import MealInfo from './MealInfo';

class MealCard extends React.Component {

    componentDidMount() {
        if (this.props.perMealMacros.calories === null) {
            this.props.fetchNutritionRecommendations()
        };
    };

    // calorieCount = () => {
    //     return (this.props.calories / 4)
    // }
    // proteinCount = () => {
    //    return  (this.props.protein / 4)
    // }

    // carbCount = () => {
    //     return (this.props.carbs / 4)
    // }

    // fatCount = () => {
    //     return (this.props.fat / 4)
    // }

    
    render() {
        
        const caloriesConsumed = this.props.meal === undefined ? 0 : this.props.meal.calories_consumed
        const fatConsumed = this.props.meal === undefined ? 0 : this.props.meal.fat_consumed
        const carbsConsumed = this.props.meal === undefined ? 0 : this.props.meal.carbs_consumed
        const proteinConsumed = this.props.meal === undefined ? 0 : this.props.meal.protein_consumed

        return (
        
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            Meal {this.props.mealNumber}
                        </Col>
                        <Col>
                        <Button variant="outline-dark" onClick={() => {this.props.history.push('/add-food')}}>Add Food</Button>
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <MealInfo macro={this.props.perMealMacros.calories}/>
                        </Col>
                        <Col>
                            <MealInfo macro={this.props.perMealMacros.protein}/>
                        </Col>
                        <Col>
                            <MealInfo macro={this.props.perMealMacros.carbs}/>
                        </Col>
                        <Col>
                        <MealInfo macro={this.props.perMealMacros.fat}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MealInfo macro={caloriesConsumed}/>
                        </Col>
                        <Col>
                            <MealInfo macro={proteinConsumed}/>
                        </Col>
                        <Col>
                            <MealInfo macro={carbsConsumed}/>
                        </Col>
                        <Col>
                        <MealInfo macro={fatConsumed}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
           
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        perMealMacros: state.macros.per_meal_macros,
        dailyMacros: state.macros.daily_macros,
        mealCount: state.dietParams.mealsPerDay,
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, {fetchNutritionRecommendations})(withRouter(MealCard));