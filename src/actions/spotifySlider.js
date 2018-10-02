import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_SPOTIFY_SLIDER_REQUEST = 'FETCH_SPOTIFY_SLIDER_REQUEST';
export const fetchSpotifySliderRequest = loading => ({
  type: FETCH_SPOTIFY_SLIDER_REQUEST,
  loading
})

export const FETCH_SPOTIFY_SLIDER_SUCCESS = 'FETCH_SPOTIFY_SLIDER_SUCCESS';
export const fetchSpotifySliderSuccess = songs => ({
  type: FETCH_SPOTIFY_SLIDER_SUCCESS,
  songs
})

export const FETCH_SPOTIFY_SLIDER_ERROR = 'FETCH_SPOTIFY_SLIDER_ERROR';
export const fetchSpotifySliderError = error => ({
  type: FETCH_SPOTIFY_SLIDER_ERROR,
  error
})

export const fetchSpotifySlider = (sliderObj) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log("slider OBJ!!", sliderObj);
  return fetch(`${API_BASE_URL}/users/rec`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(sliderObj)
  })
  .then(res => {
    return normalizeResponseErrors(res)
  })
  .then(res => {
    return res.json()
  })
  .then(songsArr => {
    // console.log(songsArr, 'discovered songs')
    dispatch(fetchSpotifySliderSuccess(songsArr))
  })
  .catch(err => {
    // console.log(err)
    dispatch(fetchSpotifySliderError(err))
  })
};
