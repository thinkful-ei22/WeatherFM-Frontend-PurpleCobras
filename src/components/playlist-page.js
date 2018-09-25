import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

export class PlaylistPage extends React.Component {

  render() {
    let userPlaylist = [
      {name: 'Sunny', songs: [1111, 2222, 3333, 4444]},
      {name: 'Rainy', songs: [1111, 2222, 3333, 4444]},
      {name: 'Stormy', songs: [1111, 2222, 3333, 4444]}
    ];

    // code to loop through user's playlist object and make a link for each one
    let links = [];

    let loopedLinks = function () {
      for (let i = 0; i < userPlaylist.length; i++ ) {
        let name = userPlaylist[i].name;
        console.log(name);
      links.push(<Link key={name} to={`/playlist/${name}`} className="playlistLink">{name} Playlist</Link>);
      }
      return links;
    }

    return (
      <div>
        {loopedLinks()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName}`,
  };
};

export default requiresLogin()(connect(mapStateToProps)(PlaylistPage));