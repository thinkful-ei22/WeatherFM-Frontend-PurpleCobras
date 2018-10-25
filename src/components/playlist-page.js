import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists } from '../actions/playlists';
// import HeaderBar from './header-bar';
import '../css/playlist-page.css';

export class PlaylistPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPlaylists());
  }

  render() {
    // let userPlaylists;
    // userPlaylists = this.props.playlists;
    // let links = [];
    // let userPlaylistArray;
    // if (this.props.playlists) {
    //   userPlaylistArray = Object.keys(userPlaylists);
    //   let i = 0;
    //   userPlaylistArray.map(() => {
    //     let name = userPlaylistArray[i];
    //     links.push(
    //       <Link key={name} to={`/playlist/${name}`} className="playlistLink" component={name}>
    //         <div className="flex-item">{name}</div>
    //       </Link>);
    //     i++;
    //   });
    //   return links;
    // }

    return (
      <div className="flex-container">

        <div className="flex-item">
          <div className="left">
            <div className="text">Sunny Playlist</div>
          </div>
        </div>

        <div className=""></div>

        <div className="img"></div>

      </div>

    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName}`,
    playlists: state.playlists.playlists
  };
};

export default requiresLogin()(connect(mapStateToProps)(PlaylistPage));