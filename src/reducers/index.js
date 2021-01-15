import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dietReducer from './dietReducer';
import macroRecommendationsReducer from './macroRecommendationsReducer';

export default combineReducers({
    auth: authReducer,
    dietParams: dietReducer,
    macros: macroRecommendationsReducer
})