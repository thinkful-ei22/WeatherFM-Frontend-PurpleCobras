import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_SPOTIFY_REQUEST = 'FETCH_SPOTIFY_REQUEST';
export const fetchSpotifyRequest = loading => ({
  type: FETCH_SPOTIFY_REQUEST,
  loading
});

export const FETCH_SPOTIFY_SUCCESS = 'FETCH_SPOTIFY_SUCCESS';
export const fetchSpotifySuccess = songs => ({
  type: FETCH_SPOTIFY_SUCCESS,
  songs
});

export const FETCH_SPOTIFY_ERROR = 'FETCH_SPOTIFY_ERROR';
export const fetchSpotifyError = error => ({
  type: FETCH_SPOTIFY_ERROR,
  error
});

export const fetchSpotify = (weather) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  // console.log(weather);

  return fetch(`${API_BASE_URL}/users/rec/${weather}`, {
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
    .then(songsArr => {
    // console.log(songsArr, 'discovered songs')
      dispatch(fetchSpotifySuccess(songsArr));
    })
    .catch(err => {
    // console.log(err)
      dispatch(fetchSpotifyError(err));
    });
};

//Syncing your playlist
export const SYNC_SPOTIFY_REQUEST = 'SYNC_SPOTIFY_REQUEST';
export const syncSpotifyRequest = loading => ({
  type: SYNC_SPOTIFY_REQUEST,
  loading
});

export const SYNC_SPOTIFY_SUCCESS = 'SYNC_SPOTIFY_SUCCESS';
export const syncSpotifySuccess = success => ({
  type: SYNC_SPOTIFY_SUCCESS,
  success
});

export const SYNC_SPOTIFY_ERROR = 'SYNC_SPOTIFY_ERROR';
export const syncSpotifyError = error => ({
  type: SYNC_SPOTIFY_ERROR,
  error
});

export const syncSpotifyPlaylist = (accessToken, weather, playlist) => (dispatch) => {

  dispatch(syncSpotifyRequest());

  const songIds = playlist.map(song => {
    return `spotify:track:${song.spotifyId}`;
  });

  return fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    }
  })
    .then(result => {
      return result.json();
    })
    .then(result => {
      return fetch(`https://api.spotify.com/v1/users/${result.id}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: `WeatherFM - ${weather}`
        })
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          return fetch(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              uris: songIds
            })
          })
            .catch(err => {
              dispatch(syncSpotifyError(err));
            });
        })
        .catch(err => {
          dispatch(syncSpotifyError(err));
        });
    })
    .catch(err => {
      dispatch(syncSpotifyError(err));
    });
};

