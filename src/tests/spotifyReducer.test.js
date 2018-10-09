/* global $ expect jest */
import spotifyReducer from '../reducers/spotify';
import {fetchSpotifySuccess} from '../actions/spotify';

describe ('Spotify Reducer', () => {
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
});