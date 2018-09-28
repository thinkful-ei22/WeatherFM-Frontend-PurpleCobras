import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
export class Discover extends React.Component {
  
  componentDidMount = () => {
    console.log(this, '1st this');

    this.props.dispatch(fetchSpotify(this.props.weather)); 


  }

  // get first song
  // run YT API call
  // render song on page w/ SONG component
  
  // add to playlist button -> click to add to playlist with same title as weather w/ endpoint
  // SEND BACK -> weather, artist, song title, album thumbnail -- all in req. body

  // next button -> pop off songs[0] -- rerender

  returnSong = () => {

    if(this.props.spotifyList.length){
      this.props.dispatch(fetchYoutube(this.props.spotifyList[0].songTitle, this.props.spotifyList[0].artist))
      console.log(this.props.url);

    }
    if (this.props.url){
      return <Song url={this.props.url} />
    }
  }
  render() {
    return (
      <div>
        Right now it is {this.props.weather}! <br /><br />

        {this.props.weather} Radio

        {this.returnSong()}
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
      url: state.youtube.videoURL
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));
