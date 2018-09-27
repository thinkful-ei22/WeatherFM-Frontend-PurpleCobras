import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists } from '../actions/playlists';

export class Playlist extends React.Component {
  componentDidMount() {
    console.log('Playlist Component Mounted');
    this.props.dispatch(fetchPlaylists());
  }

  render() {
    let pathName = this.props.location.pathname;
    let pathArray = pathName.split('/');
    let playlistName = pathArray[2];
    console.log(playlistName)
  
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
        songs.push(
          <div key={title}>
            <img src={albumArt}></img>, {title}, by {artist}
          </div>
        );
      }
    }
      return songs;
    }

    return (
      <div>
        <h1>{playlistName} Playlist</h1>
        {loopedSongs(this.props.playlists)}
        <Song url = "https://www.youtube.com/watch?v=9egDNv987DU"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName}`,
      playlists: state.playlists.playlists
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
