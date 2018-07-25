import {
    WINNERS_TAG, FETCH, FETCH_SUCCESS, FETCH_ERROR
} from '../constants/actionTypes';
import { actionCreator } from '../util';

import {
    QUERY_WINNERS
} from '../constants/api';

import { apiRequest } from './api';

//Private functions --start

const flattenChampionsObject = (data) => {
    return data.map(item => {
        let results = item.Results[0];
        return {
            raceName: item.raceName,
            driver: results.Driver,
            constructor: results.Constructor,
            time: item.Results[0].Time.time
        }
    });
}

//API success call back function
const fetchWinnersSuccess = (res) => (dispatch) => {
    let payload = [];
    if (res.data.MRData.RaceTable && res.data.MRData.RaceTable.Races) {
        payload = flattenChampionsObject(res.data.MRData.RaceTable.Races);
    }
    dispatch(actionCreator(WINNERS_TAG, FETCH_SUCCESS, payload, null));
}

//API error call back function
const fetchWinnersError = (error) => (dispatch) => {
    dispatch(actionCreator(WINNERS_TAG, FETCH_ERROR, error.message, null));
}

//Private functions --end

//This function will fetch all the available seasons
export const fetchWinners = (season) => (dispatch, getState) => {
    dispatch(actionCreator(WINNERS_TAG, FETCH, null, null));
    dispatch(apiRequest("GET", `${season}${QUERY_WINNERS}`, null, fetchWinnersSuccess, fetchWinnersError, WINNERS_TAG));
}

