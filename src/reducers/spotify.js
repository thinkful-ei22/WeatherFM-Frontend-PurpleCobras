import {
  FETCH_SPOTIFY_REQUEST,
  FETCH_SPOTIFY_SUCCESS,
  FETCH_SPOTIFY_ERROR
} from '../actions/spotify';

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
  return state;
}
