import React from 'react';
import Song from './song';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchWeather } from '../actions/weather';

export class Discover extends React.Component {
  
  
  // componentDidMount = () => {
  //   console.log(this, '1st this');
  //   const {dispatch} = this.props;
  //   // if ("geolocation" in navigator) {
  //   //   /* geolocation is available */
  //   //   navigator.geolocation.getCurrentPosition(function(position) {
  //   //     console.log(position.coords.latitude, position.coords.longitude);

  //   //     dispatch(fetchWeather(position.coords.latitude, position.coords.longitude));
  //   //   });
           
  //   // } else {
  //   //   /* geolocation IS NOT available */
  //   //   console.log('geolocation is not available')
  //   // }
  // }

  returnSong = (weather) => {
    if (weather === 'Rain'){
      console.log('raining');
      return <Song url="https://www.youtube.com/watch?v=J3eUw5ApueY" />
    }
    else if (weather ==='Drizzle'){
      return <Song url="https://www.youtube.com/watch?v=wYkl_fPs6P4" />
    }
  }
  render() {
    return (
      <div>
        Right now it is {this.props.weather}! <br /><br />

        {this.props.weather} Radio

        {this.returnSong('Rain')}
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
      weather: state.weather.weather
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));
