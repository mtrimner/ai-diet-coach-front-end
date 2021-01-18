const INITIAL_STATE = {
    daily_macros: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null
    },
    per_meal_macros: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IMPORT_MACROS':
            return {
                ...state, daily_macros: {
                    ...state.daily_macros, calories: action.payload.daily_macros.calories,
                    protein: action.payload.daily_macros.protein,
                    carbs: action.payload.daily_macros.carbs,
                    fat: action.payload.daily_macros.fat
                },
                per_meal_macros: {
                    ...state.per_meal_macros, calories: action.payload.per_meal_macros.calories,
                    protein: action.payload.per_meal_macros.protein,
                    carbs: action.payload.per_meal_macros.carbs,
                    fat: action.payload.per_meal_macros.fat
                }
            };
        default:
            return state;
    }

}