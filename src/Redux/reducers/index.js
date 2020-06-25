import { combineReducers } from 'redux';
import setOneReducer from "./setOne";
import setTimeReducer from "./setTime";
import setTwoReducer from "./setTwo";
import setResultReducer from "./setResult";

const allReducers = combineReducers({
    getOne: setOneReducer,
    getTime: setTimeReducer,
    getTwo: setTwoReducer,
    getResult: setResultReducer
});

export default allReducers;
