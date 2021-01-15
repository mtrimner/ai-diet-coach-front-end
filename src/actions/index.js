
export const getProfileFetch = () => (dispatch) => {
    const token = localStorage.getItem("token")
        if(token){
            fetch('http://localhost:3000/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                dispatch({type: 'SIGN_IN', payload: data})
                // this.props.signIn(data)
            })
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
        console.log(data)
        dispatch({type: 'IMPORT_MACROS', payload: data})
        // this.props.signIn(data)
    })
}