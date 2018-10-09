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
  FETCH_PLAYLISTS_ERROR,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_ERROR,
  ADD_SONG_SUCCESS,
  ADD_SONG_ERROR,
  CHANGE_SONGS_SUCCESS,
  CHANGE_SONGS_ERROR} from '../actions/playlists';

describe('playlists', () => {
  it('Should fetch the playlists for a user.', () => {
    const obj = {artist:'test'};
    const action = fetchPlaylistsSuccess(obj);
    expect(action.type).toEqual(FETCH_PLAYLISTS_SUCCESS);
    expect(action.playlists).toEqual(obj);
  });
  it('Should return an error when fetch playlists comes back with an error.', () => {
    const obj = {error: 400};
    const action = fetchPlaylistsError(obj);
    expect(action.type).toEqual(FETCH_PLAYLISTS_ERROR);
    expect(action.error).toEqual(obj);
  });

  it('Should return nothing for a successful delete for a song.', () => {
    const action = deleteSongSuccess();
    expect(action.type).toEqual(DELETE_SONG_SUCCESS);
  });
  it('Should return an error when delete song comes back with an error.', () => {
    const obj = {error: 400};
    const action = deleteSongError(obj);
    expect(action.type).toEqual(DELETE_SONG_ERROR);
    expect(action.error).toEqual(obj);
  });

  it('Should return nothing when successfully adding a song to a playlist.', () => {
    const action = addSongSuccess();
    expect(action.type).toEqual(ADD_SONG_SUCCESS);
  });
  it('Should return an error when add song comes back with an error.', () => {
    const obj = {error: 400};
    const action = addSongError(obj);
    expect(action.type).toEqual(ADD_SONG_ERROR);
    expect(action.error).toEqual(obj);
  });

  it('Should return nothing when successfuly changing songs.', () => {
    const action = changeSongsSuccess();
    expect(action.type).toEqual(CHANGE_SONGS_SUCCESS);
  });
  it('Should return an error when change song comes back with an error.', () => {
    const obj = {error: 400};
    const action = changeSongsError(obj);
    expect(action.type).toEqual(CHANGE_SONGS_ERROR);
    expect(action.error).toEqual(obj);
  });
});
 
