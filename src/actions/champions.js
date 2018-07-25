import {
    CHAMPIONS_TAG, FETCH, FETCH_SUCCESS, FETCH_ERROR, FETCH_FROM_SESSION
} from '../constants/actionTypes';
import {setSessionStorage, getSessionStorage, actionCreator} from '../util';
import {KEY_CHAMPIONS_LIST} from '../constants/sessionKeys';

import {
    QUERY_CHAMPIONS
} from '../constants/api';

import { apiRequest } from './api';

//Private functions --start

const flattenChampionsObject = (data) => {
    return data.map(item => {
        let driverStandings = item.DriverStandings[0];
        return {
            season : item.season,
            driver : driverStandings.Driver,
            constructor : driverStandings.Constructors[0],
            wins : driverStandings.wins,
            points : driverStandings.points
        }
    });
}

//API success call back function
const fetchChampionsSuccess = (res) => (dispatch) => {
    let payload = [];
    if (res.data.MRData.StandingsTable && res.data.MRData.StandingsTable.StandingsLists) {
        payload = flattenChampionsObject(res.data.MRData.StandingsTable.StandingsLists);
        setSessionStorage(KEY_CHAMPIONS_LIST, payload);
    }
    dispatch(actionCreator(CHAMPIONS_TAG, FETCH_SUCCESS, payload, null));
}

//API error call back function
const fetchChampionsError = (error) => (dispatch) => {
    dispatch(actionCreator(CHAMPIONS_TAG, FETCH_ERROR, error.message, null));
}

//This private function will check whether the store has seasons or not
const shouldFetchChampions = (state) => (dispatch) => {
    const champions = state.champions.list;
    if (champions.fetched && champions.data.length > 0) {
        return false
    }else{
        const payload = getSessionStorage(KEY_CHAMPIONS_LIST);;
        if(payload && payload.length > 0){
            dispatch(actionCreator(CHAMPIONS_TAG, FETCH_FROM_SESSION, null, null));
            dispatch(actionCreator(CHAMPIONS_TAG, FETCH_SUCCESS, payload, null));
            return false;
        }
    }
    return true;
}

//Private functions --end

//This function will fetch all the available seasons
export const fetchChampions = () => (dispatch, getState) => {
    if (dispatch(shouldFetchChampions(getState()))) {
        dispatch(actionCreator(CHAMPIONS_TAG, FETCH, null, null));
        dispatch(apiRequest("GET", QUERY_CHAMPIONS, null, fetchChampionsSuccess, fetchChampionsError, CHAMPIONS_TAG));
    }
}

