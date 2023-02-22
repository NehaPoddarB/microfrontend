import { combineReducers } from 'redux';
import { reducer as studio } from './studio';
import { reducer as employee } from './employee';



const rootReducer = combineReducers({
    studio, employee
});

export default rootReducer;
