import { API_BASE_URL } from '../config';

export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
export const fetchPlaylistsSuccess = playlists => ({
  type: FETCH_PLAYLISTS_SUCCESS,
  playlists
});

export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR';
export const fetchPlaylistsError = error => ({
  type: FETCH_PLAYLISTS_ERROR,
  error
});

export const fetchPlaylists = () => (dispatch, getState) =>{
  const authToken = getState().auth.authToken; 

  console.log('Fetching Playlists');
  return fetch(`${API_BASE_URL}/users/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((playlists) => dispatch(fetchPlaylistsSuccess(playlists)))
    .catch(err => {
      dispatch(fetchPlaylistsError(err));
    });
};

// delete a song

export const DELETE_SONG_SUCCESS = 'DELETE_SONG_SUCCESS';
export const deleteSongSuccess = () => ({
  type: DELETE_SONG_SUCCESS,
});

export const DELETE_SONG_ERROR = 'DELETE_SONG_ERROR';
export const deleteSongError = error => ({
  type: DELETE_SONG_ERROR,
  error
});

export const deleteSong = (weather, songTitle) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log('Deleting Song', weather);

  return fetch(`${API_BASE_URL}/users/playlists/${weather}/${songTitle}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(() => dispatch(deleteSongSuccess()))
    .then((res) => dispatch(fetchPlaylists(res)))
    .catch((err) => {
      dispatch(deleteSongError(err));
    });
};

// add a song

export const ADD_SONG_SUCCESS = 'ADD_SONG_SUCCESS';
export const addSongSuccess = () => ({
  type: ADD_SONG_SUCCESS
});

export const ADD_SONG_ERROR = 'ADD_SONG_ERROR';
export const addSongError = error => ({
  type: ADD_SONG_ERROR,
  error
});

export const addSong = (weather, spotifyId, artist, songTitle, thumbnail) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log('Adding song to', weather);

  return fetch(`${API_BASE_URL}/users/playlists`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      weather,
      spotifyId,
      artist,
      songTitle,
      thumbnail
    })
  })
  .then(res => res.json())
  .then((res) => dispatch(addSongSuccess(res)))
  .catch((err) => {
    dispatch(addSongError(err))
  })
}

export const CHANGE_SONGS_SUCCESS = 'CHANGE_SONGS_SUCCESS';
export const changeSongsSuccess = () => ({
  type: CHANGE_SONGS_SUCCESS
})

export const CHANGE_SONGS_ERROR = 'CHANGE_SONGS_ERROR';
export const changeSongsError = error => ({
  type: CHANGE_SONGS_ERROR,
  error
})

export const changeSongs = (Sunny, Rainy, Drizzle, Snowy, Cloudy, Thunderstorm) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log('Customized Songs--------', Sunny);

  return fetch(`${API_BASE_URL}/users/`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      Sunny,
      Rainy,
      Drizzle,
      Snowy,
      Cloudy,
      Thunderstorm
    })
  })
  .then(res => res.json())
  .then(() => dispatch(changeSongsSuccess()))
  .catch((err) => {
    dispatch(changeSongsError(err))
  })
}
