export default (state = [], action) => {
switch (action.type) {
    case 'ADD_MEALS':
        // return ( 
        //     [
        //     ...state,
        const mealsArray = action.payload.map((meal) => {
            const mealFoods = meal.foods.map((food) => {
                return ({
                    adjusted_calories: food.adjusted_calories,
                    adjusted_carbs: food.adjusted_carbs,
                    adjusted_fat: food.adjusted_fat,
                    adjusted_protein: food.adjusted_protein,
                    adjusted_serving_size: food.adjusted_serving_size,
                    calories: food.calories,
                    calories_consumed: food.calories_consumed,
                    carbs: food.carbs,
                    carbs_consumed: food.carbs_consumed,
                    fat: food.fat,
                    fat_consumed: food.fat_consumed,
                    id: food.id,
                    meal_id: food.meal_id,
                    name: food.name,
                    protein: food.protein,
                    protein_consumed: food.protein_consumed,
                    serving_size: food.serving_size
                })
            })
            return ( 
                {
                   id: meal.id,
                    user_id: meal.user_id,
                    calorie_goal: meal.calorie_goal,
                    calories_consumed: meal.calories_consumed,
                    carb_goal: meal.carb_goal,
                    carbs_consumed: meal.carbs_consumed,
                    fat_goal: meal.fat_goal,
                    fat_consumed: meal.fat_consumed,
                    protein_goal: meal.protein_goal,
                    protein_consumed: meal.protein_consumed,
                    created_at: meal.created_at,
                    updated_at: meal.updated_at,
                    foods: mealFoods
                }
            )
            
        })
        return state.concat(mealsArray)
        default:
            return state;
    }
}