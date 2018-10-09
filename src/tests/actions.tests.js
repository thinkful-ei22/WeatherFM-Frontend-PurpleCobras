/* global $ expect jest */
import {
  fetchPlaylists, 
  fetchPlaylistsSuccess, 
  fetchPlaylistsError, 
  deleteSong, 
  deleteSongSuccess, 
  deleteSongError, 
  addSong, 
  addSongSuccess, 
  addSongError, 
  changeSongs, 
  changeSongsSuccess, 
  changeSongsError,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_ERROR} from '../actions/playlists';

import {
  fetchSpotify, 
  fetchSpotifyRequest, 
  fetchSpotifySuccess, 
  fetchSpotifyError, 
  syncSpotifyPlaylist, 
  syncSpotifyRequest, 
  syncSpotifySuccess, 
  syncSpotifyError} from '../actions/spotify';

import {
  fetchWeather, 
  fetchWeatherSuccess, 
  fetchWeatherError, 
  setWeather, 
  changeWeather, 
  changeWeatherSuccess, 
  changeWeatherError} from '../actions/weather';

describe('playlists', () => {
  it('should fetch the playlists for a user', () => {
    const str = {artist:'panini'};
    const action = fetchPlaylistsSuccess();
    expect(action.type).toEqual(FETCH_PLAYLISTS_SUCCESS);
    expect(action.playlists).toEqual(str);
  });
  it('should return an error when fetch playlists comes back with err', () => {
    const str = '400';
    const action = fetchPlaylistsError();
    expect(action.type).toEqual(FETCH_PLAYLISTS_ERROR);
    expect(action.err).toEqual(str);
  });
});
 
