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
  changeSongsError} from '../actions/playlists';

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
    const str = 'panini';
    const action = fetchPlaylists();
    expect(action.type).toEqual(NEW_SUCCESS);
    expect(action.foods).toEqual(str);
  });
});
 
