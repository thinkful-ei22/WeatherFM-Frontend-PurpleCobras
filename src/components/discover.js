import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import { addSong } from '../actions/playlists';
import Slider from './slider';
import { changeWeather } from '../actions/weather';
import '../css/discover.css';

export class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      changed: false
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

  returnSong = (index) => {
    let returnHTML = '';
    if(this.props.spotifyList.length){
      this.thumbnail = <div className="thumbnailBorder"><img src={this.props.spotifyList[this.i].thumbnail} /></div>;

      this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist));
      // console.log(this.props.url);

    }
    if(!this.props.spotifyList.length && this.props.url !== ''){
      return returnHTML = <h3>COULDNT FIND ANYTHING TRY CHANGING SLIDERS</h3>
    }

    if(this.props.url === '') {
      return returnHTML = <div className="lds-circle"></div>
    }
 
    if (this.props.url !== '' && this.props.spotifyList.length){
      returnHTML = <div><h1>{this.props.spotifyList[index].songTitle} by {this.props.spotifyList[index].artist}</h1>
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
    console.log(newWeather);
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
      url: state.youtube.videoURL,
      changed: state.weather.changed
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));