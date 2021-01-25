import React, {useEffect, useState, useRef} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { fetchNutritionRecommendations } from '../actions';
import MealInfo from './MealInfo';

const MealCard = (props) => {

    const [mealCount, setMealCount] = useState(props.mealCount)

    useEffect(() =>  {

        if (props.perMealMacros.calories === null) {
            props.fetchNutritionRecommendations()
        };
    }, []);

    const prevMealCountRef = useRef();
    useEffect(() => {
        
        prevMealCountRef.current = mealCount;
    }, [props.mealCount])

        const prevMealCount = prevMealCountRef.current
        if (prevMealCount !== props.mealCount) {
            props.fetchNutritionRecommendations()
        }
    

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