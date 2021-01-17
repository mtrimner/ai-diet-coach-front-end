import React, { useState, useEffect, useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import FoodSearchBar from './FoodSearchBar';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import {fetchNutritionRecommendations} from '../actions';
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
                proteinConsumed: 0,
                carbsConsumed: 0,
                fatConsumed: 0
            }
           setSelectedFood(selectedFood => [...selectedFood, foodSelection])
        })
       console.log(selectedFood)
    }

    const updateProgressBar = (grams, i) => {
        const multiplier = grams / 5
        setSelectedFood(selectedFood => [...selectedFood.slice(0, i),
        {...selectedFood[i], proteinConsumed: selectedFood[i].adjustedProtein * multiplier,
        carbsConsumed: selectedFood[i].adjustedCarbs * multiplier,
        fatConsumed: selectedFood[i].adjustedFat * multiplier},
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
                return { ...sliderValue, protein: macros.proteinConsumed, carbs: macros.carbsConsumed, fat: macros.fatConsumed }
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
         
            const keys_to_keep = ['proteinConsumed', 'fatConsumed', 'carbsConsumed']
            return array.map(object => keys_to_keep.reduce((acc, curr) => {
                acc[curr] = object[curr];
          
                return acc;
            }, {})); 
        };
    
        
        
        
            const renderSliderValues = () => {
               return selectedFood.reduce((a, b) => {
                   console.log(selectedFood)
                   debugger
                       return {
                            protein: a + b.proteinConsumed,
                            carbs: a + b.carbsConsumed,
                            fat: a + b.fatConsumed
                            
                        }
                        // console.log(calculatedMacros)
                        // updateSliderValueState(calculatedMacros)
                }, 0)
        }          
  

    const renderFoodCards = selectedFood.map((food, i) => {
        return <FoodServingSizeSlider key={i} index={i} name={food.name} updateProgressBar={updateProgressBar}/>      
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
                    
                       <ProgressBar striped variant="success" now={sliderValue.protein} min={0} />
                       <ProgressBar striped variant="info" now={sliderValue.carbs} />
                       <ProgressBar striped variant="warning" now={40} />
                       <ProgressBar striped variant="danger" now={80} />
                 
                </Card.Body>
                 </Card>
                {renderFoodCards}
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

export default connect(mapStateToProps, {fetchNutritionRecommendations})(withRouter(AddFoodPage))