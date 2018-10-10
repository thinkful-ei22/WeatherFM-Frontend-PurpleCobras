import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists, deleteSong, clearPlaylistsSuccess } from '../actions/playlists';
import { syncSpotifyPlaylist } from '../actions/spotify';
import { fetchYoutube, clearYoutubeSuccess } from '../actions/youtube';
import '../css/playlist.css';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: null,
      playlistName: this.props.location.pathname.split('/')[2]
    }
  }
  
  componentDidMount() {
    const currentURL = new URL(window.location);
    let accessToken=currentURL.hash.slice(14, currentURL.hash.search('&'));
    this.props.dispatch(fetchPlaylists())
      .then(() => {
        if (accessToken && this.props.playlists) {
          const weather = this.props.location.pathname.split('/')[2];
          const playlist = this.props.playlists[weather];
          this.props.dispatch(syncSpotifyPlaylist(accessToken, weather, playlist))
            .then(() => {
              window.location = (window.location.origin + window.location.pathname);
              alert("Successfully Added Playlist!")
            });
        }
      });
  }

  componentWillUnmount(){
   this.props.dispatch(clearYoutubeSuccess())
  }
  
  i = 0;
  onSyncClick(){
    const URLlocation = (window.location.origin + window.location.pathname).replace(/\//g, '%2F');
    window.location = `https://accounts.spotify.com/authorize?client_id=cae7690868bd44f7b7ae0abde50e406b&redirect_uri=${URLlocation}&`
    +'response_type=token&scope=playlist-modify-public%20user-read-email&show_dialog=true&state=3gz4kd97m4';
  }

  playSong(i){
    if (this.props.playlists) {
    let currentPlaylist = this.props.playlists[this.state.playlistName];
    //console.log(currentPlaylist);
    let title = currentPlaylist[i].songTitle;
        let artist = currentPlaylist[i].artist;
        this.props.dispatch(fetchYoutube(artist, title, 'video'))
    }
  }
 
  youtubeClick(artist, title, index){
    this.i = index;
    this.props.dispatch(fetchYoutube(artist, title, 'video'));
  }
  
  getPrevSong(){
    if (this.i > 0){
      this.i--;
      this.playSong(this.i);
    }
  }
    
  getNextSong(){
    this.i++;
    this.playSong(this.i);
  }

  onEnd(){
    this.i++;
    if (this.i === this.props.playlists[this.state.playlistName].length){
      console.log(this.i);
      this.i=0;
    }
    // console.log('song has ended');
    const song = this.props.playlists[this.state.playlistName][this.i];
    // console.log(song);
    this.props.dispatch(fetchYoutube(song.artist, song.songTitle, 'video'));
  }

  render() {
    const { dispatch, url, youtube, weather } = this.props;
    const {deleteSongFromPlaylist, i} = this;
    const {playlistName} = this.state;
    let currentPlaylist;
    // code to loop through user's playlist object and render each song
    let songs = [];
    let loopedSongs =  (playlists) => {
      if (playlists) {
        currentPlaylist = playlists[this.state.playlistName];
        for (let i = 0; i < currentPlaylist.length; i++ ) {
          let title = currentPlaylist[i].songTitle;
          let artist = currentPlaylist[i].artist;
          let albumArt = currentPlaylist[i].thumbnail;
          // dispatch API call to get youtube url & set it to a variable
          songs.push(
            <div key={title}>
              <img src={albumArt} style={{width: 100, height: 100}}></img>, {title}, by {artist},
              
              <button onClick={(e) => {
                this.youtubeClick(artist, title, i);
                this.setState({
                  currentArtist: artist,
                  currentSongTitle: title
                })
              }}>Play</button>
              <button onClick={(e) => {
                dispatch(deleteSong(playlistName, title, artist, albumArt));
              }}>
              Delete Song
              </button>
              <hr />
            </div>
          );
        }
      }
      return songs;
    };

    let currentSong;
    if (this.props.url === ''){
    this.playSong(i);
    }
    if (this.props.urlLoading === true){
      currentSong = <div className="lds-circle"></div>;
    } else if(this.props.urlLoading === false){
      currentSong = <Song 
      url = {this.props.url} 
      onEnded ={() => this.onEnd()}
      onPrevClick={() => this.getPrevSong()}
      onNextClick={() => this.getNextSong()}
      />
    }

    return (
      <div>
        <h1>{playlistName} Playlist</h1>
        {/* <Song url = {this.props.url}/> */}
        {currentSong}       
        <button onClick={() => this.onSyncClick()} >Export playlist to Spotify</button>
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
    title: state.youtube.videoTitle,
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
