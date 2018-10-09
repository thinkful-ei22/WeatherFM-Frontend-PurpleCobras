/* global $ expect jest */
import {
  fetchSpotify, 
  fetchSpotifyRequest, FETCH_SPOTIFY_REQUEST,
  fetchSpotifySuccess, FETCH_SPOTIFY_SUCCESS,
  fetchSpotifyError, FETCH_SPOTIFY_ERROR,
  syncSpotifyPlaylist, 
  syncSpotifyRequest, SYNC_SPOTIFY_REQUEST, 
  syncSpotifySuccess, SYNC_SPOTIFY_SUCCESS,
  syncSpotifyError, SYNC_SPOTIFY_ERROR} 
  from '../actions/spotify';

import { 
  fetchSpotifySliderRequest, FETCH_SPOTIFY_SLIDER_REQUEST,
  fetchSpotifyAveragesSuccess, FETCH_SPOTIFY_AVERAGES_SUCCESS,
  updateSpotifyAverages, UPDATE_SPOTIFY_AVERAGES,
  fetchSpotifySliderError, FETCH_SPOTIFY_SLIDER_ERROR,
  fetchSpotifySliderSuccess, FETCH_SPOTIFY_SLIDER_SUCCESS,} 
  from '../actions/spotifySlider';

describe('Spotify Actions', () => {
  it('Should make a spotify request action.', () => {
    const action = fetchSpotifyRequest();
    expect(action.type).toEqual(FETCH_SPOTIFY_REQUEST);
  });
  it('Should return the songs when fetch spotify comes back successfully.', () => {
    const obj = {song: 'test'};
    const action = fetchSpotifySuccess(obj);
    expect(action.type).toEqual(FETCH_SPOTIFY_SUCCESS);
    expect(action.songs).toEqual(obj);
  });
  it('Should return an error when fetch spotify comes back with an error.', () => {
    const obj = {error: 400};
    const action = fetchSpotifyError(obj);
    expect(action.type).toEqual(FETCH_SPOTIFY_ERROR);
    expect(action.error).toEqual(obj);
  });

  it('Should make a spotify sync request action.', () => {
    const action = syncSpotifyRequest();
    expect(action.type).toEqual(SYNC_SPOTIFY_REQUEST);
  });
  it('Should return the songs when fetch spotify comes back successfully.', () => {
    const obj = {song: 'test'};
    const action = syncSpotifySuccess(obj);
    expect(action.type).toEqual(SYNC_SPOTIFY_SUCCESS);
    expect(action.success).toEqual(obj);
  });
  it('Should return an error when fetch spotify comes back with an error.', () => {
    const obj = {error: 400};
    const action = syncSpotifyError(obj);
    expect(action.type).toEqual(SYNC_SPOTIFY_ERROR);
    expect(action.error).toEqual(obj);
  });

  it('Should make a spotify slider request action.', () => {
    const action = fetchSpotifySliderRequest();
    expect(action.type).toEqual(FETCH_SPOTIFY_SLIDER_REQUEST);
  });
  it('Should return the songs when fetch spotify slider comes back successfully.', () => {
    const obj = {song: 'test'};
    const action = fetchSpotifySliderSuccess(obj);
    expect(action.type).toEqual(FETCH_SPOTIFY_SLIDER_SUCCESS);
    expect(action.songs).toEqual(obj);
  });
  it('Should return an error when fetch spotify slider comes back with an error.', () => {
    const obj = {error: 400};
    const action = fetchSpotifySliderError(obj);
    expect(action.type).toEqual(FETCH_SPOTIFY_SLIDER_ERROR);
    expect(action.error).toEqual(obj);
  });
  it('Should return the averages when fetch spotify averages come back successfully.', () => {
    const obj = {avg: 'test'};
    const action = fetchSpotifyAveragesSuccess(obj);
    expect(action.type).toEqual(FETCH_SPOTIFY_AVERAGES_SUCCESS);
    expect(action.averages).toEqual(obj);
  });
  it('Should return the songs when updated spotify average comes back successfully.', () => {
    const obj = {avg: 'test'};
    const action = updateSpotifyAverages(obj);
    expect(action.type).toEqual(UPDATE_SPOTIFY_AVERAGES);
    expect(action.average).toEqual(obj);
  });
});