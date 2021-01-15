const INITIAL_STATE = {
    calories: null,
    protein: null,
    carbs: null,
    fat: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IMPORT_MACROS':
            return {
                ...state,
                calories: action.payload.calories,
                protein: action.payload.macros.protein,
                carbs: action.payload.macros.carbs,
                fat: action.payload.macros.fat,
            };
        default:
            return state;
    }

}