import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
import '../css/app.css';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import Discover from './discover';
import {refreshAuthToken} from '../actions/auth';
import PlaylistPage from './playlist-page';
import {fetchWeather} from '../actions/weather';
import Playlist from './playlist';
import Onboarding from './onboarding';
 
export class App extends React.Component {
  componentDidMount(){
    this.getLocation();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  getLocation (){
    // console.log('geoloc running');
    let latitude, longitude;
    // console.log(this, '1st this');
    const {dispatch} = this.props;
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        dispatch(fetchWeather(latitude, longitude, '_'));
      });
    } else {
      /* geolocation IS NOT available */
      console.log('geolocation is not available');
    }      
  }

  render() {
        return (
            <div className="app">
                <Route exact path="/(dashboard|discover|playlists)/" component={HeaderBar} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/onboarding" component={Onboarding} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/discover" component={Discover} />
                <Route exact path="/playlists" component={PlaylistPage} />
                 <Route path="/playlist/:name" component={HeaderBar} />
                <Route path="/playlist/:name" component={Playlist} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
