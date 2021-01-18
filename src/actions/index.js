
export const fetchUserAndDietParams = () => async (dispatch, getState) => {
    
    await dispatch(getProfileFetch());

    const userId = getState().auth.userId

    dispatch(getDietParams(userId))
}

export const getProfileFetch = () => async (dispatch) => {
    const token = localStorage.getItem("token")
        if(token){
            const response = await fetch('http://localhost:3000/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
               return dispatch({type: 'SIGN_IN', payload: data})
                // this.props.signIn(data)
            
        } else { dispatch({type: 'SIGN_OUT'})}
}

export const signUp = (user) => {
    return {
        type: 'SIGN_UP',
        payload: user
    }
}

export const signIn = (user) => {
    return {
        type: 'SIGN_IN',
        payload: user
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const changeDiet = (diet) => {
    return {
        type: 'CHANGE_DIET',
        payload: diet
    }
}

export const fetchNutritionRecommendations = () => (dispatch) => {
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/macros', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(data => {
        dispatch({type: 'IMPORT_MACROS', payload: data})
    })
}

export const getDietParams = (userId) => (dispatch) => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/diets/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(data => {
        dispatch({type: 'CHANGE_DIET', payload: data})
    })
}

export const submitMeal = (foods, mealMacros) => (dispatch, getState) => {
    const token = localStorage.getItem("token")
    const state = getState()
    const data = {
        meal: {
        user_id: state.auth.userId,
        calorie_goal:(state.macros.calories / state.dietParams.mealsPerDay),
        fat_goal: (state.macros.fat / state.dietParams.mealsPerDay),
        carb_goal: (state.macros.carbs / state.dietParams.mealsPerDay),
        protein_goal: (state.macros.protein / state.dietParams.mealsPerDay),
        carbs_consumed: mealMacros.carbs,
        protein_consumed: mealMacros.protein,
        fat_consumed: mealMacros.fat,
        calories_consumed: mealMacros.calories,
        foods_attributes: foods
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/meals', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}