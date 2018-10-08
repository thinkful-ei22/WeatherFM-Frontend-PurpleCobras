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
   state = {
    karaokeMode: false,
    karaokeModeButton: 'hide',
    currentArtist: '',
    currentSongTitle: '',
    currentIndex: null,
    playlistName: this.props.location.pathname.split('/')[2]
  }
  
  karaokeTitle = '';
  checkedForLyricsSong = false;

  onSyncClick() {
    const URLlocation = (window.location.origin + window.location.pathname).replace(/\//g, '%2F');
    
    window.location = `https://accounts.spotify.com/authorize?client_id=cae7690868bd44f7b7ae0abde50e406b&redirect_uri=${URLlocation}&`
    +'response_type=token&scope=playlist-modify-public%20user-read-email&show_dialog=true&state=3gz4kd97m4';
  }

  // dispatch(fetchYoutube(title, artist));
  // to delete -> send in weather, artist, title, and thumbnail
  // api/users/playlists
  switchMode = () =>{
    console.log('switch mode running');
    let artist = this.state.currentArtist;
    let title = this.state.currentSongTitle;
    this.setState({
      karaokeMode: !this.state.karaokeMode
    }, function () {
      if (this.state.karaokeMode){
        console.log('karaoke mode');
        console.log(this.state.currentArtist, this.state.currentSongTitle);
        this.props.dispatch(fetchYoutube(artist, title, 'karaoke'));
        }
        else {
          console.log('video mode');
          console.log(this.state.currentArtist, this.state.currentSongTitle);
          this.props.dispatch(fetchYoutube(artist, title, 'video'))
        }
    })
  }
  checkLyricsVideo = (title) => {
    console.log('should be ', title.toLowerCase().includes('lyrics') || title.toLowerCase().includes('lyric'));
    if ((title.toLowerCase().includes('lyrics') 
    || title.toLowerCase().includes('lyric'))
    && (!title.toLowerCase().includes('lyrics in description'))
    && (!title.toLowerCase().includes('lyrics below'))
    && (this.karaokeTitle !== this.officialTitle)
    )
    {
      console.log('there is a lyrics video');
      if (this.state.karaokeModeButton === 'hide'){
        this.setState({
          karaokeModeButton: 'show'
        })
      }
    }
    else {
      console.log('there is not a lyrics video');
      if (this.state.karaokeModeButton === 'show'){
      if (this.state.karaokeMode === true){
      this.setState({
        karaokeMode: false,
        karaokeModeButton: 'hide'
      })
    }
    else {
      this.setState({
        karaokeModeButton: 'hide'
      })
    }
    }
  }
  }
  changeModeButton = () =>{
    console.log('changing mode');
    let switchButton;
    if (this.state.karaokeMode === false){
     switchButton = <button onClick={() => this.switchMode()} className={this.state.karaokeModeButton}>Switch to Karaoke Mode</button>;

    }
    else {

      switchButton = <button onClick={() => this.switchMode()} className={this.state.karaokeModeButton}>Switch to Video Mode</button>;
    }
    return switchButton;

  }

  onEnd = () => {
    
    console.log('song has ended');
    this.setState({
      currentIndex: this.state.currentIndex+1
    }, () => {
      const song = this.props.playlists[this.state.playlistName][this.state.currentIndex];
      console.log(song);
      if (this.state.karaokeMode){
      this.props.dispatch(fetchYoutube(song.artist, song.songTitle, 'karaoke'))
      }
      else {
        this.props.dispatch(fetchYoutube(song.artist, song.songTitle, 'video'))

      }
    })
  }
  youtubeClick = (artist, title, index) => {
    this.setState({
      currentIndex: index
    })

    if (!this.state.karaokeMode){
      this.props.dispatch(fetchYoutube(artist, title, 'karaoke'))
      .then(() =>{
        this.karaokeTitle = this.props.title.toLowerCase();
        console.log(this.karaokeTitle);
        this.checkLyricsVideo(this.karaokeTitle);
        this.checkedForLyricsSong = true;
      })
      .then (this.props.dispatch(fetchYoutube(artist, title, 'video')))
      
      
      }
      else {
       this.props.dispatch(fetchYoutube(artist, title, 'video'))
      }
  }

  render() {
    const { dispatch, url, youtube, weather } = this.props;
    const {deleteSongFromPlaylist} = this;
    const {playlistName} = this.state;

    



    // let pathName = this.props.location.pathname;
    // let pathArray = pathName.split('/');
    // let playlistName = pathArray[2];

    //console.log(playlistName)
    //console.log(this.props);

    let currentPlaylist;

    // code to loop through user's playlist object and render each song
    let songs = [];
    let loopedSongs =  (playlists) => {

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
                this.youtubeClick(artist, title, i);
              
                this.setState({
                  currentArtist: artist,
                  currentSongTitle: title
                })
              }}>Play</button>

              <button onClick={(e) => {
                //console.log(playlistName, title, artist, albumArt);

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
      currentSong = <Song url = {this.props.url} onEnded ={() => this.onEnd()}/>

    }

    return (
      <div>
        <h1>{playlistName} Playlist</h1>
        {/* <Song url = {this.props.url}/> */}
        {currentSong}        {this.changeModeButton()}
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
