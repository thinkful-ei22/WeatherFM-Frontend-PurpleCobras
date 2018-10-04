import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import { addSong } from '../actions/playlists';
import { changeWeather } from '../actions/weather';
import '../css/discover.css';

export class Discover extends React.Component {
  constructor() {
    let karaokeModeButton = 'show';
    super()
    this.state = {
      changed: false,
      karaokeMode: false
    }
  }
  
  thumbnail="";
  i=0;
  componentDidMount = () => {
    console.log(this, '1st this');
    // console.log(this, '1st this');

    this.props.dispatch(fetchSpotify(this.props.weather)); 
    this.setState({changed: false});
  }

  getNextSong(){
    // console.log('i is: ', this.i);

    this.i++;
    // console.log('i is now: ', this.i);

    this.returnSong(this.i);
  }

  switchMode = () =>{
    //console.log('switch mode running');
    this.setState({
      karaokeMode: !this.state.karaokeMode
    })
  }
  changeModeButton = () =>{
    //console.log('changing mode');
    let switchButton;
    if (this.state.karaokeMode === false){
     switchButton = <button onClick={() => this.switchMode()} className={this.karaokeModeButton}>Switch to Karaoke Mode</button>;

    }
    else {
      switchButton = <button onClick={() => this.switchMode()} className={this.karaokeModeButton}>Switch to Video Mode</button>;
    }
    return switchButton;

  }
  checkLyricsVideo = () => {
    console.log('checking video to see if it is a lyrics video');
    if (!this.props.title.toLowerCase().includes('lyrics')){
      console.log('this is not a lyrics video');
      this.karaokeModeButton = 'hide';
      console.log(this.karaokeModeButton, 'karaokeModeButton className');
    }
    else {
      console.log('this is a lyrics video');
      this.karaokeModeButton = 'show';
      console.log(this.karaokeModeButton, 'karaokeModeButton className');
    }
   
  }

  returnSong = (index) => {
    //console.log('returnSong ran');
    let returnHTML = '';
    if(this.props.spotifyList.length){
      //console.log(this.props.spotifyList);
      this.thumbnail = <div className="thumbnailBorder"><img src={this.props.spotifyList[this.i].thumbnail} /></div>;
      if (this.state.karaokeMode === false){
        //console.log('karaokeMode is' +this.state.karaokeMode)
        //console.log('video mode');
        if (this.props.url === ''){
      this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'karaoke'));
        }
        else {
        console.log(this.props.url, 'lyrics video URL');
        console.log(this.props.title, 'video title');
        this.checkLyricsVideo();
      this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'video'));
        }
      // console.log(this.props.url);
      }
      else if (this.state.karaokeMode === true) {
        //console.log('karaokeMode is' +this.state.karaokeMode)
        //console.log('karaoke mode');
        this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'karaoke'));

      }
    }

    if(this.props.url === '') {
      return returnHTML = <div className="lds-circle"></div>
    }
 
    else if (this.props.url){
      console.log(this.props.url, 'props.url');
      let returnHTML = <div><h1>{this.props.spotifyList[index].songTitle} by {this.props.spotifyList[index].artist}</h1>
      <p>{this.props.lyrics}</p>
       <Song url={this.props.url} />
       <button onClick={(e) =>{
          this.props.dispatch(addSong(
            this.props.weather, 
            this.props.spotifyList[this.i].artist, 
            this.props.spotifyList[this.i].songTitle, 
            this.props.spotifyList[this.i].thumbnail
          ))
        }}>
          Add to Playlist
        </button>
       </div>;

       return returnHTML;
    }
  }

  changeWeather = (newWeather) => {
    //console.log(newWeather);
    this.props.dispatch(changeWeather(newWeather))
    .then(this.props.dispatch(fetchSpotify(this.props.weather)))
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        Right now it is {this.props.weather}! <br />
        <label forHTML="Radio">Change the station: </label>
        <select 
          name="Radio"
          // value={this.props.weather} 
          onChange={e => 
            this.changeWeather(e.target.value)
            // console.log(e.target.value)
        }>
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Drizzle">Drizzle</option>
          <option value="Snowy">Snowy</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Thunderstorm">Thunderstorm</option>
        </select>
        <br /><br />

        {this.props.weather} Radio

        {this.returnSong(this.i)}
        {this.changeModeButton()}

        <button onClick={() => this.getNextSong()}>Next</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName}`,
      protectedData: state.protectedData.data,
      weather: state.weather.weather,
      spotifyList: state.spotify.songs,
      title: state.youtube.videoTitle,
      url: state.youtube.videoURL,
      changed: state.weather.changed,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));