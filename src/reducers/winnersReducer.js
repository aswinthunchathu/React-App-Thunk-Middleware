import { combineReducers } from 'redux';
import { WINNERS_TAG } from '../constants/actionTypes';
import { reducerCreator } from '../util';

const list = reducerCreator([], WINNERS_TAG);

const winnersReducer = combineReducers({
    list
});

export default winnersReducer;