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