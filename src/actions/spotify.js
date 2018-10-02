import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_SPOTIFY_REQUEST = 'FETCH_SPOTIFY_REQUEST';
export const fetchSpotifyRequest = loading => ({
  type: FETCH_SPOTIFY_REQUEST,
  loading
})

export const FETCH_SPOTIFY_SUCCESS = 'FETCH_SPOTIFY_SUCCESS';
export const fetchSpotifySuccess = songs => ({
  type: FETCH_SPOTIFY_SUCCESS,
  songs
})

export const FETCH_SPOTIFY_ERROR = 'FETCH_SPOTIFY_ERROR';
export const fetchSpotifyError = error => ({
  type: FETCH_SPOTIFY_ERROR,
  error
})

export const fetchSpotify = (weather) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  // console.log(weather);

  return fetch(`${API_BASE_URL}/users/rec/${weather}`, {
    method: 'GET',
    header: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
  .then(res => {
    return normalizeResponseErrors(res)
  })
  .then(res => {
    return res.json()
  })
  .then(songsArr => {
    // console.log(songsArr, 'discovered songs')
    dispatch(fetchSpotifySuccess(songsArr))
  })
  .catch(err => {
    // console.log(err)
    dispatch(fetchSpotifyError(err))
  })
};
