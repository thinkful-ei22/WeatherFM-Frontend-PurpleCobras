/* global $ expect jest */
import playListReducer from '../reducers/playlists';
import {
  fetchPlaylistsSuccess, 
  fetchPlaylistsError, 
  deleteSongSuccess, 
  deleteSongError, 
  addSongSuccess, 
  addSongError} from '../actions/playlists';

describe ('Playlist Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = playListReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      playlists: null,
      error: null,
      deleted: null});
  });
  it('Should handle the fetch playlist success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const playlist = {test: 'test'};
    const state = playListReducer(oldState, fetchPlaylistsSuccess(playlist));
    expect(state.playlists).toEqual(playlist);
  });
  it('Should handle the fetch playlist error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, fetchPlaylistsError(error));
    expect(state.error).toEqual(error);
  });

  it('Should handle the delete song success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const state = playListReducer(oldState, deleteSongSuccess());
  });
  it('Should handle the delete song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, deleteSongError(error));
    expect(state.error).toEqual(error);
  });

  it('Should handle the add song success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const state = playListReducer(oldState, addSongSuccess());
  });
  it('Should handle the add song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, addSongError(error));
    expect(state.error).toEqual(error);
  });
});