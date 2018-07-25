import { combineReducers } from 'redux';
import { CHAMPIONS_TAG } from '../constants/actionTypes';
import { reducerCreator } from '../util';

const list = reducerCreator([], CHAMPIONS_TAG);

const championsReducer = combineReducers({
    list
});

export default championsReducer;