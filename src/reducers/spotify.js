import {
  FETCH_SPOTIFY_REQUEST,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_ERROR
} from '../actions/spotify';

import {
  FETCH_SPOTIFY_SLIDER_ERROR,
  FETCH_SPOTIFY_SLIDER_SUCCESS
} from '../actions/spotifySlider';

const initialState = {
  songs: [],
  error: null
}

export default function reducer(state = initialState, action){
  if (action.type === FETCH_SPOTIFY_SUCCESS){
    // console.log('FETCH SPOTIFY SONGS SUCCESSFUL');
    return Object.assign({}, state, {

      songs: action.songs
    })
  }
  else if (action.type === FETCH_SPOTIFY_ERROR){
    // console.log('FETCH SPOTIFY SONGS SUCCESSFUL');
    return Object.assign({}, state, {
      error: action.error
    })
  }
  else if (action.type === FETCH_SPOTIFY_SLIDER_ERROR){
    // console.log('FETCH SPOTIFY SONGS SUCCESSFUL');
    return Object.assign({}, state, {
      error: action.error
    })
  }
  else if (action.type === FETCH_SPOTIFY_SLIDER_SUCCESS){
    // console.log('FETCH SPOTIFY SONGS SUCCESSFUL');
    return Object.assign({}, state, {
      songs: action.songs
    })
  }
  return state;
}
