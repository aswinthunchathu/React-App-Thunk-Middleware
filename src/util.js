import React from 'react';
import Notification from './components/Notification';
import {
    FETCH, FETCH_SUCCESS, FETCH_ERROR
} from './constants/actionTypes';

//This function store data to session
export const setSessionStorage = (key, value) => {
    const data = { value };
    sessionStorage.setItem(key, JSON.stringify(data));
}

//This function fetch data from session
export const getSessionStorage = (key) => {
    let data = sessionStorage.getItem(key);
    if (data !== null && data !== "") {
        return JSON.parse(data).value;
    }
    return null;
}

const tagCreator = (tag, type) => {
    return `${tag} ${type}`;
}

//This function returns an action
//tag : action tag name eg. [seasons]
//type : action type name eg. fetch,fetch success etc
//payload : data to store in app store
//meta : meta data
export const actionCreator = (tag, type, payload, meta) => {
    return {
        type: tagCreator(tag, type),
        payload : payload,
        meta : meta
    };
}

//This function returns a basic reducer
//tag : action tag name eg. [seasons]
//initaialValue : initial value of data to be stored
export const reducerCreator = (initaialValue, tag) => {
    return (
        state = {
            fetching: false,
            fetched: false,
            data: initaialValue,
            error: null
        }, action
    ) => {
        switch (action.type) {
            case tagCreator(tag, FETCH):
                return {
                    ...state,
                    fetching: true
                }
            case tagCreator(tag, FETCH_SUCCESS):
                return {
                    ...state,
                    fetched: true,
                    fetching: false,
                    data: action.payload,
                    error : null
                }
            case tagCreator(tag, FETCH_ERROR):
                return {
                    ...state,
                    fetching: false,
                    fetched:true,
                    data : initaialValue,
                    error: action.payload
                }
            default:
                return state;
        }
    }
}

export const showNotification = (condition) => (type, heading,  message) =>{
    return (
        condition ? 
        <Notification heading={heading} type={type} message={message}/> :
        null
    )
}