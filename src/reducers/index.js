import { combineReducers } from 'redux';
import championsReducer from './championsReducer';
import seasonsReducer from './seasonsReducer';
import winnersReducer from './winnersReducer';

const rootReducer = combineReducers({
    champions : championsReducer,
    seasons : seasonsReducer,
    winners : winnersReducer
});

export default rootReducer