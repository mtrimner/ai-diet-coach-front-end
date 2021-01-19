

export default (state = [], action) => {
switch (action.type) {
    case 'ADD_MEALS':
        data.map((meal, i) => {
            const mealFoods = meal.foods.map((food, j) => {
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
            return ({
                ...state,
                   id: data[i].id,
                    user_id: data[i].user_id,
                    calorie_goal: data[i].calorie_goal,
                    calories_consumed: data[i].calories_consumed,
                    carb_goal: data[i].carb_goal,
                    carbs_consumed: data[i].carbs_consumed,
                    fat_goal: data[i].fat_goal,
                    fat_consumed: data[i].fat_consumed,
                    protein_goal: data[i].protein_goal,
                    protein_consumed: data[i].protein_consumed,
                    created_at: data[i].created_at,
                    updated_at: data[i].updated_at,
                    foods: mealFoods

                }
            )
        })
    default:
        return state;
}
}