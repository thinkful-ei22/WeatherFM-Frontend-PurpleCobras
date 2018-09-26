import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const fetchWeatherSuccess = location => ({
  type: FETCH_WEATHER_SUCCESS,
  location
})

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';
export const fetchWeatherError = error => ({
  type: FETCH_WEATHER_ERROR,
  error
})

export const fetchWeather = (location) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/weather`, {
    method: 'GET',
    headers: {
      // auth as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: 
      JSON.stringify({location: location})
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((weather) => dispatch(fetchWeatherSuccess(weather)))
  .catch(err => {
    dispatch(fetchWeatherError(err));
  })
};