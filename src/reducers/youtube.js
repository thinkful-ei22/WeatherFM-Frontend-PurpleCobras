import {
  FETCH_YOUTUBE_REQUEST,
  FETCH_YOUTUBE_SUCCESS,
  FETCH_YOUTUBE_ERROR
} from '../actions/youtube';

const initialState = {
  videoURL: '',
  error: null
}

export default function reducer(state = initialState, action){
  if (action.type === FETCH_YOUTUBE_SUCCESS){
    console.log('FETCH YOUTUBE VIDEO SUCCESSFUL');
    return Object.assign({}, state, {
      videoURL: action.videoURL
    })
  }
  else if (action.type === FETCH_YOUTUBE_ERROR){
    return Object.assign({}, state, {
      error: action.error
    })
  }
  return state;
}