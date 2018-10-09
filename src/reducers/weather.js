import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  SET_WEATHER,
  CHANGE_WEATHER_SUCCESS,
  CHANGE_WEATHER_ERROR
} from '../actions/weather';

const initialState = {
  weather: '',
  error: null,
  tempC: null,
  tempF: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_WEATHER_SUCCESS) {
    // console.log('FETCH WEATHER SUCCESSFUL');
    return Object.assign({}, state, {
      weather: action.weather,
      tempC: action.tempC,
      tempF: action.tempF, 
    });
  } else if (action.type === FETCH_WEATHER_ERROR) {
    console.log(action.error);
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === SET_WEATHER) {
    return Object.assign({}, state, {
      weather: action.weather,
      error: null
    });
  } else if (action.type === CHANGE_WEATHER_SUCCESS) {
    return Object.assign({}, state, {
      weather: action.newWeather,
      error: null
    });
  } else if (action.type === CHANGE_WEATHER_ERROR ) {
    return Object.assign({}, state, {
      error: action.error
    });
  } return state;
}