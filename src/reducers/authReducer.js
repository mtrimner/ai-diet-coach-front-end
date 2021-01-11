const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    name: null,
    email: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload.id,
                name: action.payload.name,
                email: action.payload.email
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignedIn: false,
                userId: null,
                name: null,
                email: null
            };
        default:
            return state;
    }
}