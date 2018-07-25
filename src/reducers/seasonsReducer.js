import { combineReducers } from 'redux';
import {
    SEASON_TAG, UPDATE_FROM_SEASON, UPDATE_TO_SEASON
} from '../constants/actionTypes';
import {reducerCreator} from '../util';

const list = reducerCreator([], SEASON_TAG);

const fromYear = (
    state = "2005", action) => {
    switch (action.type) {
        case UPDATE_FROM_SEASON:
            return  action.payload
        default:
            return state;
    }
}

const toYear = (
    state = "2015", action) => {
    switch (action.type) {
        case UPDATE_TO_SEASON:
            return action.payload
        default:
            return state;
    }
}

const seasonsReducer = combineReducers({
    list,
    fromYear,
    toYear
});

export default seasonsReducer;