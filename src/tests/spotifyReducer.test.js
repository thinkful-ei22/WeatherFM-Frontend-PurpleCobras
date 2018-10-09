/* global $ expect jest */
import spotifyReducer from '../reducers/spotify';
import {
  fetchSpotifySuccess, 
  fetchSpotifyError} from '../actions/spotify';
import {
  fetchSpotifySliderSuccess, 
  fetchSpotifySliderError, 
  fetchSpotifyAveragesSuccess, 
  updateSpotifyAverages} from '../actions/spotifySlider';

describe ('Spotify Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = spotifyReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      songs: [],
      error: null,
      averages: null
    });
  });
  it('Should handle the fetch spotify success action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const songs = {song: 'test'};
    const state = spotifyReducer(oldState, fetchSpotifySuccess(songs));
    expect(state.songs).toEqual(songs);
  });
  it('Should handle the fetch spotify error action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const error = '400';
    const state = spotifyReducer(oldState, fetchSpotifyError(error));
    expect(state.error).toEqual(error);
  });

  it('Should handle the fetch spotify slider success action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const songs = 'test';
    const state = spotifyReducer(oldState, fetchSpotifySliderSuccess(songs));
    expect(state.songs).toEqual(songs);
  });

  it('Should handle the fetch spotify slider error action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const error = '400';
    const state = spotifyReducer(oldState, fetchSpotifySliderError(error));
    expect(state.error).toEqual(error);
  });
  it('Should handle the fetch spotify average success action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const averages = {avg1: 4};
    const state = spotifyReducer(oldState, fetchSpotifyAveragesSuccess(averages));
    expect(state.averages).toEqual(averages);
  });
  it('Should handle the fetch spotify slider success action.', () => {
    const oldState = {
      songs: [],
      error: null,
      averages: null
    };
    const averages = {avg1: 4};
    const state = spotifyReducer(oldState, updateSpotifyAverages(averages));
    expect(state.averages).toEqual(averages);
  });
});