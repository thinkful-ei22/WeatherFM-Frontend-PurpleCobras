import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_YOUTUBE_REQUEST = 'FETCH_YOUTUBE_REQUEST';
export const fetchYoutubeRequest = loading => ({
  type: FETCH_YOUTUBE_REQUEST,
  loading
})

export const FETCH_YOUTUBE_SUCCESS = 'FETCH_YOUTUBE_SUCCESS';
export const fetchYoutubeSuccess = videoURL => ({
  type: FETCH_YOUTUBE_SUCCESS,
  videoURL
})

export const FETCH_YOUTUBE_ERROR = 'FETCH_YOUTUBE_ERROR';
export const fetchYoutubeError = error => ({
  type: FETCH_YOUTUBE_ERROR,
  error
})

export const fetchYoutube = (title, artist) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  const song = title + '+' + artist;

  console.log(title, artist, 'title and artist');

  return fetch(`${API_BASE_URL}/users/youtube/${song}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
  .then(res => {
    //console.log(res, 'res')
   return normalizeResponseErrors(res)
  })
  .then(res => {
    console.log(res, 'res')

    return res.json()
  })
  .then(videoURL => {
    console.log(videoURL, 'url in action')
    dispatch(fetchYoutubeSuccess(videoURL))
  })
  .catch(err => {
    console.log(err)
    dispatch(fetchYoutubeError(err));
  })
};