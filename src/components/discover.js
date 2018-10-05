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
    
    super()
    this.state = {
      changed: false,
      karaokeMode: false,
      karaokeModeButton: 'hide'
    }
  }
  checkedForLyricsSong = false;
  thumbnail="";
  karaokeTitle = '';
  officialTitle = '';
  i=0;
  componentDidMount = () => {
    //console.log(this, '1st this');
    // console.log(this, '1st this');

    this.props.dispatch(fetchSpotify(this.props.weather)); 
    this.setState({changed: false});
  }

  getNextSong(){
    // console.log('i is: ', this.i);
    this.checkedForLyricsSong = false;
    this.i++;
    // console.log('i is now: ', this.i);
    console.log('in getNextSong, checkedForLyricsSong equals', this.checkedForLyricsSong);
if (this.state.karaokeMode === true){
    console.log('karaokeMode INSIDE OF getNextSong() is' , this.state.karaokeMode);
    this.setState({
      karaokeMode: false
    })
}
    this.returnSong(this.i);
  }

  switchMode = (index) =>{
    //console.log('switch mode running');
    this.setState({
      karaokeMode : !this.state.karaokeMode
    }, () => {
      if (this.state.karaokeMode === false ){
        this.checkedForLyricsSong = false;
      }
      this.returnSong(index);
    })
  }

  changeModeButton = (index) =>{
    //console.log('changing button');
    let switchButton;
    if (this.state.karaokeMode === false){
     switchButton = <button onClick={() => this.switchMode(index)} className={this.state.karaokeModeButton}>Switch to Karaoke Mode</button>;

    }
    else {
      switchButton = <button onClick={() => this.switchMode(index)} className={this.state.karaokeModeButton}>Switch to Video Mode</button>;
    }
    return switchButton;

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

  returnSong = (index) => {
    this.i = index;
    console.log('returnSong ran');

    //set returnHTML to empty string 
    let returnHTML = '';

    //if spotifyList has a length
    if(this.props.spotifyList.length){
     // console.log(this.props.spotifyList);

 
     //set thumbnail
     this.thumbnail = <div className="thumbnailBorder"><img src={this.props.spotifyList[this.i].thumbnail} /></div>;
      //console.log('karaokeMode is' +this.karaokeMode);
      console.log('karaokeMode is>>>', this.state.karaokeMode);

      //console.log(this, '<<< this');
      //if karaokeMode is false
      if (this.state.karaokeMode === false){
        console.log('video mode is RUNNING');
        new Promise( (resolve, reject)  => {

          //console.log(this, '<<<THIS');
       
          // if url is empty
       //console.log('checkedForLyricsSong equals', this.checkedForLyricsSong);
       if (this.props.url === '' || this.checkedForLyricsSong === false){
         //attempts to fetch lyrics video
         //console.log('fetching lyrics video');
         console.log('checkedForLyricsSong now equals', this.checkedForLyricsSong);
     resolve(this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'karaoke')))
       }
        })
        .then (() => {
        //console.log(this.props.url, 'lyrics video URL');
        this.karaokeTitle = this.props.title.toLowerCase();
        console.log(this.karaokeTitle, '<<<lyrics video title');
        this.checkLyricsVideo(this.karaokeTitle);
        this.checkedForLyricsSong = true;
        console.log('fetching regular video');
        })
        .then (() => {
          this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'video'))
        })
        .then (() => {
        })
        .catch(err => {
          console.log(err);
        });
        this.officialTitle = this.props.title.toLowerCase();
        console.log(this.officialTitle, '<<<official video title');
        this.checkLyricsVideo(this.karaokeTitle);

      }
      else if (this.state.karaokeMode === true) {
        console.log('karaoke mode is RUNNING');

        console.log(this.props.title.toLowerCase(), '<<<lyrics video title');

        this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'karaoke'));
      }
    }

    if(this.props.url === '') {
      return returnHTML = <div className="lds-circle"></div>
    }
 
    else if (this.props.url){
      //console.log(this.props.url, 'props.url');
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
    this.returnSong(0);
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
        {this.changeModeButton(this.i)}

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