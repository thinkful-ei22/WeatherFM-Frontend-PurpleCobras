import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists, deleteSong } from '../actions/playlists';
import { fetchYoutube } from '../actions/youtube';
<<<<<<< HEAD
// import './playlist.css';
import '../css/app.css';
=======
import './playlist.css';
>>>>>>> 3ddb6302e2f2f951b92560439738375c395c4f42

// send '{title} + {artist}' as 'song

export class Playlist extends React.Component {
  componentDidMount() {
    console.log('Playlist Component Mounted');
    this.props.dispatch(fetchPlaylists());
  }

  // dispatch(fetchYoutube(title, artist));


  // to delete -> send in weather, artist, title, and thumbnail
  // api/users/playlists

  render() {
    const { dispatch, url, youtube, weather } = this.props;
    const {deleteSongFromPlaylist} = this;


    function youtubeClick(artist, title) {
      dispatch(fetchYoutube(artist, title))
    }

    let pathName = this.props.location.pathname;
    let pathArray = pathName.split('/');
    let playlistName = pathArray[2];

    console.log(playlistName)
    console.log(this.props);
    let currentPlaylist;



    // code to loop through user's playlist object and render each song
    let songs = [];
    let loopedSongs = function (playlists) {
      if (playlists) {
        currentPlaylist = playlists[playlistName];

        for (let i = 0; i < currentPlaylist.length; i++ ) {
          let title = currentPlaylist[i].songTitle;
          let artist = currentPlaylist[i].artist;
          let albumArt = currentPlaylist[i].thumbnail;

          // dispatch API call to get youtube url & set it to a variable
          // let url = '';
         console.log(youtube, 'url');
          songs.push(
            <div key={title}>
              
              <img src={albumArt} style={{width: 100, height: 100}}></img>, {title}, by {artist},
              
              <button onClick={(e) => {
                youtubeClick(artist, title);
              }}>Play</button>

              <button onClick={(e) => {
                console.log(playlistName, title, artist, albumArt);
                dispatch(deleteSong(playlistName, title, artist, albumArt));
              }}>
              Delete Song
              </button>

              {/* <Song url = {url}/> */}
              <hr />
            </div>
          );
         
        }
      }
      return songs;
    }
    let currentSong
    if(this.props.urlLoading === true){
      currentSong = <div className="lds-circle"></div>
    } else if(this.props.urlLoading === false){
      currentSong = <Song url = {this.props.url}/>
    }

    return (
      <div>
        <h1>{playlistName} Playlist</h1>
        {/* <Song url = {this.props.url}/> */}
        {currentSong}

        {loopedSongs(this.props.playlists)}
        {/* <Song url = "https://www.youtube.com/watch?v=9egDNv987DU"/> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName}`,
      playlists: state.playlists.playlists,
      weather: state.weather.weather,
      deleted: state.playlists.deleted,
      url: state.youtube.videoURL,
      urlLoading: state.youtube.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(Playlist));




    // { Sunny: [song, song, song], Cloudy: [song, song, song] }
    // [ {name: Sunny, songs: [song, song, song]}, {name: Cloudy, songs: [song, song, song]} ]

    // let playlist = [
    //   {songTitle: 'Circle', artist: 'Eden', albumArt: 'http://placehold.it/100x100', id: 1111},
    //   {songTitle: 'DKLA', artist: 'Troye Sivan', albumArt: 'http://placehold.it/100x100', id: 3333},
    //   {songTitle: 'Sweet Disposition', artist: 'The Temper Trap', albumArt: 'http://placehold.it/100x100', id: 2222},
    // ];
