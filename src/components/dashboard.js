import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchWeather} from '../actions/weather';


export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   latitude: 0,
    //   longitude:0
    // }
  }    

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


    //   function geo_success(position) {
    //     console.log(position.coords.latitude,',', position.coords.longitude);
    //   }
      
    //   function geo_error() {
    //     alert("Sorry, no position available.");
    //   }

    // location = navigator.geolocation.watchPosition(geo_success, geo_error);
      
    // console.log(latitude, longitude + '<<<outside of geo success');

    } else {
      /* geolocation IS NOT available */
      console.log('geolocation is not available')
    }
      // 
     
        //console.log('latitude received');
      
  }
  
      
    render() {
      this.getLocation();

        let weatherMessage;
        if (this.props.weather) {
          weatherMessage = <div>Right now it is {this.props.weather}!</div>
        } else {
          console.log('not working');
        }

        console.log(this.props);
        return (
            <div className="dashboard">

                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>

                {weatherMessage}
            
                <Link to={'/discover'}>Discover</Link>
                <Link to={'/playlists'}>Playlist Page</Link>
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
