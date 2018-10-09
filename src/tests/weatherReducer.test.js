/* global $ expect jest */
import weatherReducer from '../reducers/weather';
import {fetchWeatherSuccess, fetchWeatherError, setWeather, changeWeatherSuccess, changeWeatherError} from '../actions/weather';

describe ('Weather Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = weatherReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    });
  });
  it('Should handle the fetch weather success action.', () => {
    const oldState = {
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    };
    const str1 = '1';
    const str2 = '2';
    const str3 = '3';
    const state = weatherReducer(oldState, 
      fetchWeatherSuccess(str1, str2, str3));
    expect(state.weather).toEqual(str1);
    expect(state.tempC).toEqual(str2);
    expect(state.tempF).toEqual(str3);
  });
  it('Should handle the fetch weather error action.', () => {
    const oldState = {
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    };
    const str = '1';
    const state = weatherReducer(oldState, 
      fetchWeatherError(str));
    expect(state.error).toEqual(str);
  });
  it('Should handle the set weather success action.', () => {
    const oldState = {
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    };
    const str = 'test';
    const state = weatherReducer(oldState, 
      setWeather(str));
    expect(state.weather).toEqual(str);
  });
  it('Should handle the change weather success action.', () => {
    const oldState = {
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    };
    const str = 'test';
    const state = weatherReducer(oldState, 
      changeWeatherSuccess(str));
    expect(state.weather).toEqual(str);
  });
  it('Should handle the change weather error action.', () => {
    const oldState = {
      weather: '',
      error: null,
      tempC: null,
      tempF: null,
    };
    const str = 'test';
    const state = weatherReducer(oldState, 
      changeWeatherError(str));
    expect(state.error).toEqual(str);
  });
});