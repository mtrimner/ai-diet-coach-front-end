
export default (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_USER_WEIGHTS':
            const userWeights = action.payload.map((weight) => {
                return {
                    id: weight.id,
                    weight: weight.weight,
                    created_at: weight.created_at
                }     
            })
            return state.concat(userWeights)
        case 'UPDATE_WEIGHT':
            return [
                ...state,
                {
                id: action.payload.id,
                weight: action.payload.weight,
                created_at: action.payload.created_at
                }
            ]
            
        default:
            return state;
    }
}