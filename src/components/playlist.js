import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists, deleteSong } from '../actions/playlists';
import { syncSpotifyPlaylist } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import '../css/playlist.css';

// send '{title} + {artist}' as 'song

export class Playlist extends React.Component {
  componentDidMount() {
    console.log('Playlist Component Mounted');
    const currentURL = new URL(window.location);
    let accessToken=currentURL.hash.slice(14, currentURL.hash.search('&'));

    this.props.dispatch(fetchPlaylists())
      .then(() => {
        if (accessToken && this.props.playlists) {
          const weather = this.props.location.pathname.split('/')[2];
          const playlist = this.props.playlists[weather];
          console.log('send DATA', weather, playlist);
          this.props.dispatch(syncSpotifyPlaylist(accessToken, weather, playlist))
            .then(() => {
              window.location = (window.location.origin + window.location.pathname);
            });
        }
      });
  }

  onSyncClick() {
    const URLlocation = (window.location.origin + window.location.pathname).replace(/\//g, '%2F');
    
    window.location = `https://accounts.spotify.com/authorize?client_id=cae7690868bd44f7b7ae0abde50e406b&redirect_uri=${URLlocation}&`
    +'response_type=token&scope=playlist-modify-public%20user-read-email&show_dialog=true&state=3gz4kd97m4';
  }

  // dispatch(fetchYoutube(title, artist));


  // to delete -> send in weather, artist, title, and thumbnail
  // api/users/playlists

  render() {
    const { dispatch, url, youtube, weather } = this.props;
    const {deleteSongFromPlaylist} = this;


    function youtubeClick(artist, title) {
      dispatch(fetchYoutube(artist, title));
    }

    let pathName = this.props.location.pathname;
    let pathArray = pathName.split('/');
    let playlistName = pathArray[2];

    console.log(playlistName);
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
          //console.log(youtube, 'url');
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
    };
    let currentSong;
    if(this.props.urlLoading === true){
      currentSong = <div className="lds-circle"></div>;
    } else if(this.props.urlLoading === false){
      currentSong = <Song url = {this.props.url}/>;
    }

    return (
      <div>
        <h1>{playlistName} Playlist</h1>
        {/* <Song url = {this.props.url}/> */}
        {currentSong}
        <button onClick={() => this.onSyncClick()} >Creatue playing on Spotify using these songs.</button>

        {loopedSongs(this.props.playlists)}
        {/* <Song url = "https://www.youtube.com/watch?v=9egDNv987DU"/> */}
      </div>
    );
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
