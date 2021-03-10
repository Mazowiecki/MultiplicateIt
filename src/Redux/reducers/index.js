import { combineReducers } from 'redux';
import setOneReducer from './setOne';
import setTimeReducer from './setTime';
import setTwoReducer from './setTwo';
import setResultReducer from './setResult';
import setNickReducer from './setNick';

const allReducers = combineReducers({
    getOne: setOneReducer,
    getTime: setTimeReducer,
    getTwo: setTwoReducer,
    getResult: setResultReducer,
    getNick: setNickReducer
});

export default allReducers;
