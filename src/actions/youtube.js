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

export const fetchYoutube = (title, artist, mode) => (dispatch, getState) => {
  dispatch(fetchYoutubeRequest());
  const authToken = getState().auth.authToken;

  let songArtist = artist.split(' ').join('+'); 
  let songTitle = title.split(' ').join('+');

  // console.log(title, artist, 'title and artist');

  return fetch(`${API_BASE_URL}/users/youtube/${songArtist}/${songTitle}/${mode}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(res => {
    //console.log(res, 'res')
      return normalizeResponseErrors(res);
    })
    .then(res => {
    // console.log(res, 'res')

    return res.json()
  })
  .then(videoInfo => {
   // console.log(videoInfo);
    let videoTitle = videoInfo.videoTitle;
    let videoURL = videoInfo.videoURL
    //console.log(videoTitle, 'videoTitle');
   // console.log(videoURL, 'videoURL');
    // console.log(videoURL, 'url in action')
    dispatch(fetchYoutubeSuccess(videoTitle, videoURL))
  })
  .catch(err => {

    // console.log(err)
      dispatch(fetchYoutubeError(err));
    });
};