import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dietReducer from './dietReducer';
import macroRecommendationsReducer from './macroRecommendationsReducer';
import todaysMealsReducer from './todaysMealReducer';

export default combineReducers({
    auth: authReducer,
    dietParams: dietReducer,
    macros: macroRecommendationsReducer,
    todaysMeals: todaysMealsReducer
})