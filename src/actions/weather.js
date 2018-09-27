import {saveWeather} from '../local-storage';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const fetchWeatherSuccess = weather => ({
  type: FETCH_WEATHER_SUCCESS,
  weather
})

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';
export const fetchWeatherError = error => ({
  type: FETCH_WEATHER_ERROR,
  error
})

export const SET_WEATHER = 'SET_WEATHER';
export const setWeather = weather => ({
    type: SET_WEATHER,
    weather
});

// store weather in local storage


const storeWeather = (weather, dispatch) => {
  saveWeather(weather);
  dispatch(setWeather(weather));
};

export const fetchWeather = (latitude, longitude) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  console.log('latitude', latitude, 'and longitude', longitude);
  const newLat = Math.floor(latitude);
  const newLong = Math.floor(longitude);
  return fetch(`${API_BASE_URL}/users/weather/${newLat}/${newLong}`, {
    method: 'GET',
    headers: {
      // auth as credentials
      Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((weather) => dispatch(fetchWeatherSuccess(weather)))
  .then(({weather}) => storeWeather(weather))
  .catch(err => {
    dispatch(fetchWeatherError(err));
  })
};