import {saveWeather} from '../local-storage';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const fetchWeatherSuccess = (weather, tempC, tempF) => ({
  type: FETCH_WEATHER_SUCCESS,
  weather,
  tempC,
  tempF
});

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';
export const fetchWeatherError = error => ({
  type: FETCH_WEATHER_ERROR,
  error
});

export const SET_WEATHER = 'SET_WEATHER';
export const setWeather = weather => ({
  type: SET_WEATHER,
  weather
});

export const CHANGE_WEATHER_SUCCESS = 'CHANGE_WEATHER_SUCCESS';
export const changeWeatherSuccess = newWeather => ({
  type: CHANGE_WEATHER_SUCCESS,
  newWeather
});

export const CHANGE_WEATHER_ERROR = 'CHANGE_WEATHER_ERROR';
export const changeWeatherError = error => ({
  type: CHANGE_WEATHER_ERROR,
  error
});


// store weather in local storage

const storeWeather = (weather, dispatch) => {
  // console.log(weather);
  saveWeather(weather);
  dispatch(setWeather(weather));
};

export const fetchWeather = (latitude, longitude, cityZip) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  //console.log('latitude', latitude, 'and longitude', longitude);
  const newLat = latitude;
  const newLong = longitude;
  const newCityZip = cityZip;
  return fetch(`${API_BASE_URL}/users/weather/${newLat}/${newLong}/${newCityZip}`, {
    method: 'GET',
    headers: {
      // auth as credentials
      Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((weather) => {
      // console.log(weather, typeof weather, weather.weather);
      
      dispatch(fetchWeatherSuccess(
        weather.weather,
        weather.tempC,
        weather.tempF));
      storeWeather(weather.weather);
    })
    .catch(err => {
      dispatch(fetchWeatherError(err));
    });
};

export const changeWeather = (weather) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let newWeather = weather;

  console.log(newWeather);
  // need to fix the endpoint/refactor
  return fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'
    }
  })
    .then(() => dispatch(changeWeatherSuccess(newWeather)))
    .then(({newWeather}) => storeWeather(newWeather))
    .catch(err => {
      dispatch(changeWeatherError(err));
    });
};