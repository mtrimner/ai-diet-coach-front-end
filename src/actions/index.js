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