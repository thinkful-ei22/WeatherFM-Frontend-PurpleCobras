import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR
} from '../actions/weather';

const initialState = {
  weather: '',
  error: null
}

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_WEATHER_SUCCESS) {
    console.log('FETCH WEATHER SUCCESSFUL');
    return Object.assign({}, state, {
      weather: action.weather
    })
  } else if (action.type === FETCH_WEATHER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  } return state;
}