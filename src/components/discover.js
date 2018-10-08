import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import { addSong } from '../actions/playlists';
import '../css/app.css';
import Slider from './slider';
import { changeWeather } from '../actions/weather';
import '../css/discover.css';

export class Discover extends React.Component {
  constructor() {
    
    super()
    this.state = {
      changed: false,
      // karaokeMode: false,
      // karaokeModeButton: 'hide'
    }
  }
  // checkedForLyricsSong = false;
  thumbnail="";
  // karaokeTitle = '';
  // officialTitle = '';
  i=0;
  componentDidMount = () => {
  
    this.props.dispatch(fetchSpotify(this.props.weather)); 

    this.setState({changed: false});
  }

  getNextSong(){
    // console.log('i is: ', this.i);
    this.i++;
    // console.log('i is now: ', this.i);
    this.returnSong(this.i);
  }
  onEnded(){
    console.log('Song has ended');

    this.getNextSong();
  }


  // switchMode = (index) =>{
  //   //console.log('switch mode running');
  //   this.setState({
  //     karaokeMode : !this.state.karaokeMode
  //   }, () => {
  //     if (this.state.karaokeMode === false ){
  //       this.checkedForLyricsSong = false;
  //     }
  //     this.returnSong(index);
  //   })
  // }

  // changeModeButton = (index) =>{
  //   //console.log('changing button');
  //   let switchButton;
  //   if (this.state.karaokeMode === false){
  //    switchButton = <button onClick={() => this.switchMode(index)} className={this.state.karaokeModeButton}>Switch to Karaoke Mode</button>;

  //   }
  //   else {
  //     switchButton = <button onClick={() => this.switchMode(index)} className={this.state.karaokeModeButton}>Switch to Video Mode</button>;
  //   }
  //   return switchButton;

  // }
  // checkLyricsVideo = (title) => {
  //   console.log('should be ', title.toLowerCase().includes('lyrics') || title.toLowerCase().includes('lyric'));
  //   if ((title.toLowerCase().includes('lyrics') 
  //   || title.toLowerCase().includes('lyric'))
  //   && (!title.toLowerCase().includes('lyrics in description'))
  //   && (!title.toLowerCase().includes('lyrics below'))
  //   && (this.karaokeTitle !== this.officialTitle)
  //   )
  //   {
  //     console.log('there is a lyrics video');
  //     if (this.state.karaokeModeButton === 'hide'){
  //       this.setState({
  //         karaokeModeButton: 'show'
  //       })
  //     }
  //   }
  //   else {
  //     console.log('there is not a lyrics video');
  //     if (this.state.karaokeModeButton === 'show'){
  //     if (this.state.karaokeMode === true){
  //     this.setState({
  //       karaokeMode: false,
  //       karaokeModeButton: 'hide'
  //     })
  //   }
  //   else {
  //     this.setState({
  //       karaokeModeButton: 'hide'
  //     })
  //   }
  //   }
  // }
  // }

  returnSong = (index) => {
    console.log('returnSong ran');

    this.i = index;

    //set returnHTML to empty string 
    let returnHTML = '';

    //if spotifyList has a length
    if(this.props.spotifyList.length){
    
     this.thumbnail = <div className="thumbnailBorder"><img src={this.props.spotifyList[this.i].thumbnail} /></div>;
          
     this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist, 'video'))
    }

     if(!this.props.spotifyList.length && this.props.url !== ''){
      return returnHTML = <h3>COULDNT FIND ANYTHING TRY CHANGING SLIDERS</h3>
    }
    
     if(this.props.url === '') {
      return returnHTML = <div className="lds-circle"></div>
    }

    else if (this.props.url && this.props.spotifyList.length){

       returnHTML = <div className="songTitle"><h1>{this.props.spotifyList[index].songTitle} by {this.props.spotifyList[index].artist}</h1>
       <div className="thumbnail">{this.thumbnail}</div>
       <div className="controls"></div>
       <Song url={this.props.url} onEnded={()=> this.onEnded()}/>
     
       <button onClick={(e) =>{
        //  console.log(this.props.spotifyList[this.i]);
          this.props.dispatch(addSong(
            this.props.weather,
            this.props.spotifyList[this.i].spotifyId, 
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
    .then(this.returnSong(0))
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="discover">
   Right now it is {this.props.weather}! <br />
        <label htmlFor="Radio">Change the station: </label>
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

        <button onClick={() => this.getNextSong()}>Next</button>
        <Slider/>
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