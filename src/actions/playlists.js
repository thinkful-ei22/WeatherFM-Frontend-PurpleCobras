import { API_BASE_URL } from '../config';

export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
export const fetchPlaylistsSuccess = playlists => ({
  type: FETCH_PLAYLISTS_SUCCESS,
  playlists
})

export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR';
export const fetchPlaylistsError = error => ({
  type: FETCH_PLAYLISTS_ERROR,
  error
})

export const fetchPlaylists = () => (dispatch, getState) =>{
  const authToken = getState().auth.authToken; 

  console.log('Fetching Playlists');
  return fetch(`${API_BASE_URL}/users/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application-json'
    }
  })
  .then(res => res.json())
  .then((playlists) => dispatch(fetchPlaylistsSuccess(playlists)))
  .catch(err => {
    dispatch(fetchPlaylistsError(err));
  })
}

// delete a song

export const DELETE_SONG_SUCCESS = 'DELETE_SONG_SUCCESS';
export const deleteSongSuccess = () => ({
  type: DELETE_SONG_SUCCESS,
})

export const DELETE_SONG_ERROR = 'DELETE_SONG_ERROR';
export const deleteSongError = error => ({
  type: DELETE_SONG_ERROR,
  error
})

export const deleteSong = (weather, songTitle, artist) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log('Deleting Song', weather);

  return fetch(`${API_BASE_URL}/users/playlists/${weather}/${songTitle}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application-json'
    },
    // body: JSON.stringify({
    //   weather:weather,
    //   artist:artist,
    //   songTitle:songTitle,
    //   thumbnail:thumbnail
    // })
  })
  .then(res => res.json())
  .then((res) => dispatch(deleteSongSuccess(res)))
  .then((res) => dispatch(fetchPlaylists(res)))
  .catch((err) => {
    dispatch(deleteSongError(err))
  })
}