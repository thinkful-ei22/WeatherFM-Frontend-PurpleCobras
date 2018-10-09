/* global $ expect jest */
import {
  fetchWeather, 
  fetchWeatherSuccess, FETCH_WEATHER_SUCCESS,
  fetchWeatherError, FETCH_WEATHER_ERROR,
  setWeather, SET_WEATHER,
  changeWeather, 
  changeWeatherSuccess, CHANGE_WEATHER_SUCCESS,
  changeWeatherError, CHANGE_WEATHER_ERROR} 
  from '../actions/weather';

describe('Weather Actions', () => {
  it('Should return the weather, tempC, and tempF.', () => {
    const str1 = '1';
    const str2 = '2';
    const str3 = '3';
    const action = fetchWeatherSuccess(str1, str2, str3);
    expect(action.type).toEqual(FETCH_WEATHER_SUCCESS);
    expect(action.weather).toEqual(str1);
    expect(action.tempC).toEqual(str2);
    expect(action.tempF).toEqual(str3);
  });
  it('Should return an error when fetch weather comes back with an error.', () => {
    const obj = {error: 400};
    const action = fetchWeatherError(obj);
    expect(action.type).toEqual(FETCH_WEATHER_ERROR);
    expect(action.error).toEqual(obj);
  });
  it('Should set the weather in redux state.', () => {
    const str = 'test';
    const action = setWeather(str);
    expect(action.type).toEqual(SET_WEATHER);
    expect(action.weather).toEqual(str);
  });

  it('Should return a weather when changing weather comes back successfully.', () => {
    const obj = {weather: 'Sunny'};
    const action = changeWeatherSuccess(obj);
    expect(action.type).toEqual(CHANGE_WEATHER_SUCCESS);
    expect(action.newWeather).toEqual(obj);
  });
  it('Should return an error when change weather comes back with an error.', () => {
    const obj = {error: 400};
    const action = changeWeatherError(obj);
    expect(action.type).toEqual(CHANGE_WEATHER_ERROR);
    expect(action.error).toEqual(obj);
  });
});