import { API_BASE_URL } from '../config';
import { normalizeResponseErrors }  from './utils';

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