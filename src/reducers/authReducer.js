const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    name: null,
    email: null,
    sex: null,
    dob: null,
    height: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                sex: action.payload.sex,
                dob: action.payload.date_of_birth,
                height: action.payload.height
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