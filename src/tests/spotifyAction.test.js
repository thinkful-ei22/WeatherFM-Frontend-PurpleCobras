/* global $ expect jest */
import {
  fetchSpotify, 
  fetchSpotifyRequest, 
  fetchSpotifySuccess, 
  fetchSpotifyError, 
  syncSpotifyPlaylist, 
  syncSpotifyRequest, 
  syncSpotifySuccess, 
  syncSpotifyError,
  FETCH_SPOTIFY_REQUEST,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_ERROR,
  SYNC_SPOTIFY_REQUEST,
  SYNC_SPOTIFY_SUCCESS,
  SYNC_SPOTIFY_ERROR} from '../actions/spotify';

describe('Spotify', () => {
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
});