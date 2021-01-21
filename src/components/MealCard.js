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
        
            <Card className="shadow mt-3">
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
                            <p className="text-center font-weight-bold">Calories</p>
                        </Col>
                        <Col>
                        <p className="text-center font-weight-bold">Protein</p>
                        </Col>
                        <Col>
                        <p className="text-center font-weight-bold">Carbs</p>
                        </Col>
                        <Col>
                        <p className="text-center font-weight-bold">Fat</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-center mb-1">
                            <MealInfo macro={`Goal: ${props.perMealMacros.calories}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center mb-1">
                            <MealInfo macro={`Goal: ${props.perMealMacros.protein}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center mb-1">
                            <MealInfo macro={`Goal: ${props.perMealMacros.carbs}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center mb-1">
                        <MealInfo macro={`Goal: ${props.perMealMacros.fat}`} variant={props.variant}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-center">
                            <MealInfo macro={`Consumed: ${caloriesConsumed}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                            <MealInfo macro={`Consumed: ${proteinConsumed}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                            <MealInfo macro={`Consumed: ${carbsConsumed}`} variant={props.variant}/>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                        <MealInfo macro={`Consumed: ${fatConsumed}`} variant={props.variant}/>
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