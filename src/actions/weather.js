import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const fetchWeatherSuccess = (latitude, longitude) => ({
  type: FETCH_WEATHER_SUCCESS,
  latitude, 
  longitude
})

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';
export const fetchWeatherError = error => ({
  type: FETCH_WEATHER_ERROR,
  error
})

export const fetchWeather = (latitude, longitude) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  console.log(latitude);
  console.log('latitude', latitude, 'and longitude', longitude);
  return fetch(`${API_BASE_URL}/users/weather/${latitude}/${longitude}`, {
    method: 'GET',
    headers: {
      // auth as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: 
      JSON.stringify({latitude: latitude, longitude: longitude})
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((weather) => dispatch(fetchWeatherSuccess(weather)))
  .catch(err => {
    dispatch(fetchWeatherError(err));
  })
};