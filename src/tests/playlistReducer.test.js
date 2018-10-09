/* global $ expect jest */
import playListReducer from '../reducers/playlists';
import {fetchPlaylistsSuccess} from '../actions/playlists';

describe ('Playlist Reducer', () => {
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
});