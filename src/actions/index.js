
export const fetchUserAndDietParams = () => async (dispatch, getState) => {
    
    await dispatch(getProfileFetch());

    const userId = getState().auth.userId

    
    debugger
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