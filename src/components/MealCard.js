import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { fetchNutritionRecommendations } from '../actions';
import MealInfo from './MealInfo';

const MealCard = (props) => {

    useEffect(() =>  {
        if (props.perMealMacros.calories === null) {
            props.fetchNutritionRecommendations()
        };
    }, []);

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

    const caloriesConsumed = props.meal === undefined ? 0 : props.meal.calories_consumed
    const fatConsumed = props.meal === undefined ? 0 : props.meal.fat_consumed
    const carbsConsumed = props.meal === undefined ? 0 : props.meal.carbs_consumed
    const proteinConsumed = props.meal === undefined ? 0 : props.meal.protein_consumed
    

    const buttonType = () => {
        if (caloriesConsumed === 0) {
            return <Button variant="outline-dark" onClick={() => {props.history.push('/add-food')}}>Add Meal</Button>
        } else {
            return "Finished!"
        }
    } 
    
    
    
        
        // const caloriesConsumed = this.props.meal === undefined ? 0 : this.props.meal.calories_consumed
        // const fatConsumed = this.props.meal === undefined ? 0 : this.props.meal.fat_consumed
        // const carbsConsumed = this.props.meal === undefined ? 0 : this.props.meal.carbs_consumed
        // const proteinConsumed = this.props.meal === undefined ? 0 : this.props.meal.protein_consumed
        // buttonType = () => {
        //     if (caloriesConsumed === 0) {
        //         return <Button variant="outline-dark" onClick={() => {this.props.history.push('/add-food')}}>Add Meal</Button>
        //     } else {
        //         return "Finished!"
        //     }
        // } 

        return (
        
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            Meal {props.mealNumber}
                        </Col>
                        <Col>
                        {buttonType()}
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <MealInfo macro={props.perMealMacros.calories}/>
                        </Col>
                        <Col>
                            <MealInfo macro={props.perMealMacros.protein}/>
                        </Col>
                        <Col>
                            <MealInfo macro={props.perMealMacros.carbs}/>
                        </Col>
                        <Col>
                        <MealInfo macro={props.perMealMacros.fat}/>
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

const mapStateToProps = (state) => {
    return { 
        perMealMacros: state.macros.per_meal_macros,
        dailyMacros: state.macros.daily_macros,
        mealCount: state.dietParams.mealsPerDay,
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, {fetchNutritionRecommendations})(withRouter(MealCard));