/* global $ expect jest */
import playListReducer from '../reducers/playlists';
import {} from '../actions/playlists';

describe ('playlist reducer', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = playListReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      playlists: null,
      error: null,
      deleted: null});
  });
});