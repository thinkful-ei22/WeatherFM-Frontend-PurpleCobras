import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import { addSong } from '../actions/playlists';
export class Discover extends React.Component {
  
  i=0;
  componentDidMount = () => {
    console.log(this, '1st this');

    this.props.dispatch(fetchSpotify(this.props.weather)); 


  }

  getNextSong(){
    console.log('i is: ', this.i);

    this.i++;
    console.log('i is now: ', this.i);

    this.returnSong(this.i);
  }
  // get first song
  // run YT API call
  // render song on page w/ SONG component
  
  // add to playlist button -> click to add to playlist with same title as weather w/ endpoint
  // SEND BACK -> weather, artist, song title, album thumbnail -- all in req. body

  // next button -> pop off songs[0] -- rerender

  returnSong = (index) => {

    if(this.props.spotifyList.length){
      this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist))
      console.log(this.props.url);

    }

    if (this.props.url){

      let returnHTML = <div><h1>{this.props.spotifyList[index].songTitle} by {this.props.spotifyList[index].artist}</h1>
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
  render() {
    return (
      <div>
        Right now it is {this.props.weather}! <br /><br />

        {this.props.weather} Radio


        {this.returnSong(this.i)}
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
      url: state.youtube.videoURL
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));
