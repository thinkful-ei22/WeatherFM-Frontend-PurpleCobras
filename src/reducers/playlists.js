import {
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_ERROR,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_ERROR,
  ADD_SONG_SUCCESS,
  ADD_SONG_ERROR,
  CHANGE_SONGS_SUCCESS,
  CHANGE_SONGS_ERROR
} from '../actions/playlists';

const initialState = {
  playlists: null,
  error: null,
  deleted: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PLAYLISTS_SUCCESS) {
    // console.log('FETCH PLAYLISTS SUCCESSFUL');
    return Object.assign({}, state, {
      playlists: action.playlists,
      deleted: false,
      error: null
    });
  } else if (action.type === FETCH_PLAYLISTS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === DELETE_SONG_SUCCESS) {
    console.log('DELETE SONG SUCCESSFUL');
    return Object.assign({}, state, {
      deleted: true
    });
  } else if (action.type === DELETE_SONG_ERROR) {
    console.log('DELETE SONG ERROR', action);
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === ADD_SONG_SUCCESS) {
    console.log('ADD SONG SUCCESSFUL');
    return Object.assign({}, state, {
      error: null
    });
  } else if (action.type === ADD_SONG_ERROR) {
    console.log('ADD SONG ERROR');
    return Object.assign({}, state, {
      error: action.error
    })
  } else if (action.type === CHANGE_SONGS_SUCCESS) {
    console.log('CHANGE SONGS SUCCESS');
    return Object.assign({}, state, {
      error: null
    })
  } else if (action.type === CHANGE_SONGS_ERROR) {
    console.log(action);
    console.log('CHANGE SONGS ERROR');
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}