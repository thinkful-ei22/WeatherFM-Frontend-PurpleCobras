import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_YOUTUBE_REQUEST = 'FETCH_YOUTUBE_REQUEST';
export const fetchYoutubeRequest = loading => ({
  type: FETCH_YOUTUBE_REQUEST,
  loading
});

export const FETCH_YOUTUBE_SUCCESS = 'FETCH_YOUTUBE_SUCCESS';
export const fetchYoutubeSuccess = (videoTitle,videoURL) => ({
  type: FETCH_YOUTUBE_SUCCESS,
  videoTitle,
  videoURL
});

export const FETCH_YOUTUBE_ERROR = 'FETCH_YOUTUBE_ERROR';
export const fetchYoutubeError = error => ({
  type: FETCH_YOUTUBE_ERROR,
  error
});
export const CLEAR_YOUTUBE_SUCCESS = 'CLEAR_YOUTUBE_SUCCESS';
export const clearYoutubeSuccess = (videoTitle,videoURL) => ({
  type: CLEAR_YOUTUBE_SUCCESS,
  videoTitle,
  videoURL
});

export const fetchYoutube = (title, artist) => (dispatch, getState) => {
  dispatch(fetchYoutubeRequest());
  const authToken = getState().auth.authToken;
  let songArtist = artist.split(' ').join('+'); 
  let songTitle = title.split(' ').join('+');
  return fetch(`${API_BASE_URL}/users/youtube/${songArtist}/${songTitle}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(res => {
      return normalizeResponseErrors(res);
    })
    .then(res => {
      return res.json();
    })
    .then(videoInfo => {
      let videoTitle = videoInfo.videoTitle;
      let videoURL = videoInfo.videoURL;
      dispatch(fetchYoutubeSuccess(videoTitle, videoURL));
    })
    .catch(err => {
      dispatch(fetchYoutubeError(err));
    });
};