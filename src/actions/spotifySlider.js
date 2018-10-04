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

export const FETCH_SPOTIFY_AVERAGES_SUCCESS = 'FETCH_SPOTIFY_AVERAGES_SUCCESS';
export const fetchSpotifyAveragesSuccess = averages => ({
  type: FETCH_SPOTIFY_AVERAGES_SUCCESS,
  averages
})

export const UPDATE_SPOTIFY_AVERAGES = 'UPDATE_SPOTIFY_AVERAGES';
export const updateSpotifyAverages = average => ({
  type: UPDATE_SPOTIFY_AVERAGES,
  average
})


export const fetchSpotifySlider = (sliderObj) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  // console.log("slider OBJ!!", sliderObj);
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

export const fetchSpotifyAverages = (songIdArray) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  // console.log("song ID array", songIdArray);
  return fetch(`${API_BASE_URL}/users/rec/averages/${songIdArray[0]},${songIdArray[1]},
    ${songIdArray[2]},${songIdArray[3]},${songIdArray[4]}`, {
    method: 'GET',
    headers: {
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
  .then(averageObj => {
    // console.log(songsArr, 'discovered songs')
    dispatch(fetchSpotifyAveragesSuccess(averageObj))
  })
  .catch(err => {
    // console.log(err)
    dispatch(fetchSpotifySliderError(err))
  })
};