import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FoodSearchBar from './FoodSearchBar';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import {fetchNutritionRecommendations} from '../actions';
import {connect} from 'react-redux';
import FoodServingSizeSlider from './FoodServingSizeSlider';
import MealInfo from './MealInfo';

const AddFoodPage = (props) =>  {
const [selectedFood, setSelectedFood] = useState([])

    useEffect(() => {
        if (props.calories === null) {
            props.fetchNutritionRecommendations()
        };
    }, []);

    const getFoodInfo = (food) => {
        const appId = process.env.REACT_APP_X_APP_ID
        const appKey = process.env.REACT_APP_X_APP_KEY
        const requestOptions = {
            method: 'POST',
            headers: {
                'x-app-id': appId,
                'x-app-key': appKey,
                'x-remote-user-id': 0,
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({"query": food})
         }
        
        fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
        .then(response => response.json())
        .then(data => {
            const multiplier = (data.foods[0].serving_weight_grams / 5)
            const foodSelection = {
                name: data.foods[0].food_name,
                servingSize: data.foods[0].serving_weight_grams,
                adjustedServingSize: 5,
                protein: data.foods[0].nf_protein,
                adjustedProtein: data.foods[0].nf_protein / multiplier,
                carbs: data.foods[0].nf_total_carbohydrate,
                adjustedCarbs: data.foods[0].nf_total_carbohydrate / multiplier,
                fat: data.foods[0].nf_total_fat,
                adjustedFat: data.foods[0].nf_total_fat / multiplier,
                proteinConsumed: null,
                carbsConsumed: null,
                fatConsumed: null
            }
           setSelectedFood(selectedFood => [...selectedFood, foodSelection])
        })
        console.log(selectedFood)
    }

    const updateProgressBar = (grams, key) => {
        console.log(grams, key)
    }

        const renderFoodCards = selectedFood.map((food, i) => {
            <FoodServingSizeSlider key={i} name={food.name} updateProgressBar={updateProgressBar}/>
        })
            
        
        return(
            <>
                <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            Meal 1
                        </Col>
                        <Col>
                        <Button variant="outline-dark" onClick={() => {props.history.push('/add-food')}}>Add Food</Button>
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                
                       <ProgressBar striped variant="success" now={3000} min={0} max={2000} />
                       <ProgressBar striped variant="info" now={20} />
                       <ProgressBar striped variant="warning" now={60} />
                       <ProgressBar striped variant="danger" now={80} />
                 
                </Card.Body>
                 </Card>
                <FoodServingSizeSlider updateProgressBar={updateProgressBar}/>
                <FoodSearchBar getFoodInfo={getFoodInfo}/>
            </>
        )
    
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