import React from 'react';
import Song from './song';
// import {connect} from 'react-redux';
// import requiresLogin from './requires-login';

export class Playlist extends React.Component {

  render() {
    let playlist = [
      {songTitle: 'Circle', artist: 'Eden', albumArt: 'http://placehold.it/100x100', id: 1111},
      {songTitle: 'DKLA', artist: 'Troye Sivan', albumArt: 'http://placehold.it/100x100', id: 3333},
      {songTitle: 'Sweet Disposition', artist: 'The Temper Trap', albumArt: 'http://placehold.it/100x100', id: 2222},
    ];

    // code to loop through user's playlist object and render each song
    let songs = [];

    let loopedSongs = function () {
      for (let i = 0; i < playlist.length; i++ ) {
        let title = playlist[i].songTitle;
        let artist = playlist[i].artist;
        let albumArt = playlist[i].albumArt;
      songs.push(
        <div>
          <img src={albumArt}></img>, {title}, by {artist}
        </div>
      );
      }
      return songs;
    }

    return (
      <div>
        {loopedSongs()}
        <Song url = "https://www.youtube.com/watch?v=9egDNv987DU"/>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   const {currentUser} = state.auth;
//   return {
//       username: state.auth.currentUser.username,
//       name: `${currentUser.firstName}`,
//   };
// };

// export default requiresLogin()(connect(mapStateToProps)(Playlists));

export default Playlist;
