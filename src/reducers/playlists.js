import {
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_ERROR
} from '../actions/playlists';

const initialState = {
  playlists: null,
  error: null
}

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PLAYLISTS_SUCCESS) {
    console.log('FETCH PLAYLISTS SUCCESSFUL');
    return Object.assign({}, state, {
      playlists: action.playlists,
      error: null
    })
  } else if (action.type === FETCH_PLAYLISTS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  } return state;
}