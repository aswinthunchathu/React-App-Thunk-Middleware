import axios from 'axios';
import { BASE_URL } from '../constants/api';

const API = axios.create({
  baseURL: BASE_URL
});

export const apiRequest = (method, url, body, onSuccess, onError, tag) => (dispatch) => {
  const API_REQUEST = `${tag ? `${tag} ` : ""}API Request`;
  dispatch({ type: API_REQUEST });
  return API(url, method).then(
    res => {
      dispatch(onSuccess(res))
    },
    err => {
      dispatch(onError(err))
    });
}
