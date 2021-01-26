import React, { useState, useEffect, useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import FoodSearchBar from './FoodSearchBar';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import {fetchNutritionRecommendations, getDietParams, submitMeal} from '../actions';
import {connect} from 'react-redux';
import FoodServingSizeSlider from './FoodServingSizeSlider';
import MealInfo from './MealInfo';

const defaultSliderValues = {
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0
}
const AddFoodPage = (props) =>  {
const [selectedFood, setSelectedFood] = useState([])
const [sliderValue, setSliderValue] = useState(defaultSliderValues)

    useEffect(() => {
        if (props.perMealMacros.calories === null) {
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
            console.log(data)
            const multiplier = (data.foods[0].serving_weight_grams / 5)
            const foodSelection = {
                name: data.foods[0].food_name,
                serving_size: data.foods[0].serving_weight_grams,
                adjusted_serving_size: 5,
                calories: data.foods[0].nf_calories,
                adjusted_calories: data.foods[0].nf_calories / multiplier,
                protein: data.foods[0].nf_protein,
                adjusted_protein: data.foods[0].nf_protein / multiplier,
                carbs: data.foods[0].nf_total_carbohydrate,
                adjusted_carbs: data.foods[0].nf_total_carbohydrate / multiplier,
                fat: data.foods[0].nf_total_fat,
                adjusted_fat: data.foods[0].nf_total_fat / multiplier,
                calories_consumed: 0,
                protein_consumed: 0,
                carbs_consumed: 0,
                fat_consumed: 0
            }
           setSelectedFood(selectedFood => [...selectedFood, foodSelection])
        })
    }

    const updateProgressBar = (grams, i) => {
        const multiplier = grams / 5
        setSelectedFood(selectedFood => [...selectedFood.slice(0, i),
        {...selectedFood[i], protein_consumed: Math.round(selectedFood[i].adjusted_protein * multiplier),
        carbs_consumed: Math.round(selectedFood[i].adjusted_carbs * multiplier),
        fat_consumed: Math.round(selectedFood[i].adjusted_fat * multiplier),
        calories_consumed: Math.round(selectedFood[i].adjusted_calories * multiplier)
        },
        ...selectedFood.slice(i+=1)]
        )
            updateSliderValueState()
        }
        
        const updateSliderValueState = async () => {
            console.log('Boom')
            // const newArray = await filterKeys(selectedFood)
          
            const macros = await filterAndReduceMacros(selectedFood)
            console.log(macros)
            setSliderValue(sliderValue => {
                return { ...sliderValue, protein: macros.protein_consumed, carbs: macros.carbs_consumed, fat: macros.fat_consumed, calories: macros.calories_consumed }
            });
        };

        const filterAndReduceMacros = async (array) => {
       
            const newArray = await filterKeys(array)
            return newArray.reduce((acc, curr) => {
                Object.keys(curr).forEach(key => {
                    acc[key] = (acc[key] || 0) + curr[key];
                });
                return acc;
            }, {});
        }

        const filterKeys = async (array) => {
         
            const keys_to_keep = ['calories_consumed', 'protein_consumed', 'fat_consumed', 'carbs_consumed']
            return array.map(object => keys_to_keep.reduce((acc, curr) => {
                acc[curr] = object[curr];
          
                return acc;
            }, {})); 
        };
    
        const handleOnSubmit = (e) => {
            e.preventDefault()
            if (sliderValue.calories === 0) {
                return null } else {
                props.submitMeal(selectedFood, sliderValue)
                }
            props.history.push("/")
        }
                
  

    const renderFoodCards = selectedFood.map((food, i) => {
        return <FoodServingSizeSlider key={i} index={i} name={food.name} updateProgressBar={updateProgressBar}/>      
    })

       
        return(
            <>
                <Card className="mt-3">
                <Card.Header>
                    <Row>
                        <Col>
                            Meal 1
                        </Col>
                        <Col>
                        <Button variant="outline-dark" onClick={(e) => {handleOnSubmit(e)}}>Submit Meal</Button>
                        </Col>
                    </Row>
                    </Card.Header>
                <Card.Body>
                    
                       <ProgressBar className="mb-1" striped variant="success" now={sliderValue.protein} label={`Protein: ${sliderValue.protein} / ${Math.round(props.perMealMacros.protein)}grams`} max={`${Math.round(props.perMealMacros.protein)}`} />
                       <ProgressBar className="mb-1" striped variant="info" now={sliderValue.carbs} label={`Carbs: ${sliderValue.carbs} / ${Math.round(props.perMealMacros.carbs)}grams`} max={`${Math.round(props.perMealMacros.carbs)}`}/>
                       <ProgressBar className="mb-1" striped variant="warning" now={sliderValue.fat} label={`Fat: ${sliderValue.fat} / ${Math.round(props.perMealMacros.fat)}grams`} max={`${Math.round(props.perMealMacros.fat)}`}/>
                       <ProgressBar className="mb-1" striped variant="danger" now={sliderValue.calories} label={`Calories: ${sliderValue.calories} / ${Math.round(props.perMealMacros.calories)}`} max={`${Math.round(props.perMealMacros.calories)}`}/>
                 
                </Card.Body>
                 </Card>
                {renderFoodCards}
                <FoodSearchBar getFoodInfo={getFoodInfo}/>
            </>
        )
    
}

const mapStateToProps = (state) => {
    return { perMealMacros: state.macros.per_meal_macros,
             dailyMacros: state.macros.daily_macros,
             mealCount: state.dietParams.mealsPerDay,
             userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, {fetchNutritionRecommendations, getDietParams, submitMeal})(withRouter(AddFoodPage))