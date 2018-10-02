import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchWeather} from '../actions/weather';
import './dashboard.css';

 
export class Dashboard extends React.Component  {

  getLocation = () => {
    console.log('geoloc running');
    let latitude, longitude;
    console.log(this, '1st this');
    const {dispatch} = this.props;
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        console.log(this, ' <THIS');
        dispatch(fetchWeather(latitude, longitude));

        console.log('at the end of function');
      });

    } else {
      /* geolocation IS NOT available */
      console.log('geolocation is not available')
    }      
  }

      
    render() {
      this.getLocation();

      console.log("THE WEATHER", this.props.weather)

      //to add the spinner
      let weather;
      if (this.props.weather === "loading...") {
        weather = <div class="lds-circle"></div>
      } else {
        weather = <div>Right now it is {this.props.weather}!</div>
      }

        console.log(this.props);
        return (
            <div className="dashboard">
                {/* <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div> */}

                {weather}
            
                <div className="linkTo">
                  <Link to={'/discover'} clasName="">Discover</Link>
                  <Link to={'/playlists'} clasName="">Playlist Page</Link>
                </div>
            </div>
        );
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
