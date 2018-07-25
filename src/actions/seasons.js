import {
    SEASON_TAG, FETCH, FETCH_SUCCESS, FETCH_ERROR, FETCH_FROM_SESSION,
    UPDATE_FROM_SEASON, UPDATE_TO_SEASON
} from '../constants/actionTypes';

import { setSessionStorage, getSessionStorage, actionCreator } from '../util';
import { KEY_SEASONS_LIST } from '../constants/sessionKeys';

import {
    QUERY_SEASONS
} from '../constants/api';

import { apiRequest } from './api';

//Private functions --start

//API success call back function
const fetchSeasonsSuccess = (res) => (dispatch) => {
    let payload = [];
    if (res.data.MRData.SeasonTable && res.data.MRData.SeasonTable.Seasons) {
        payload = res.data.MRData.SeasonTable.Seasons;
        setSessionStorage(KEY_SEASONS_LIST, payload);
    }
    dispatch(actionCreator(SEASON_TAG, FETCH_SUCCESS, payload, null));
}

//API error call back function
const fetchSeasonsError = (error) => (dispatch) => {
    dispatch(actionCreator(SEASON_TAG, FETCH_ERROR, error, null));
}

//This private function will check whether the store has seasons or not
const shouldFetchSeasons = (state) => (dispatch) => {
    const seasons = state.seasons.list;
    if (seasons.fetched && seasons.data.length > 0) {
        return false
    } else {
        const payload = getSessionStorage(KEY_SEASONS_LIST);;
        if (payload && payload.length > 0) {
            dispatch(actionCreator(SEASON_TAG, FETCH_FROM_SESSION, null, null));
            dispatch(actionCreator(SEASON_TAG, FETCH_SUCCESS, payload, null));
            return false;
        }
    }
    return true;
}

//Private functions --end

//This function will fetch all the available seasons
export const fetchSeasons = () => (dispatch, getState) => {
    if (dispatch(shouldFetchSeasons(getState()))) {
        dispatch(actionCreator(SEASON_TAG, FETCH, null, null));
        dispatch(apiRequest("GET", QUERY_SEASONS, null, fetchSeasonsSuccess, fetchSeasonsError, SEASON_TAG));
    }
}

//This function will update selected season vale
export const updateSelectedSeason = (type, payload) => (dispatch, getState) => {
    dispatch({ type: type, payload });
    //Change selected "To year" to 1 year more than "From year"
    if (type === UPDATE_FROM_SEASON) {
        if (getState().seasons.toYear <= payload) {
            payload = `${parseInt(payload, 10) + 1}`;
            dispatch({ type: UPDATE_TO_SEASON, payload });
        }
    }
}
