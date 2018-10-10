import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { fetchWeather } from '../actions/weather';
import { clearAuthToken } from '../local-storage';
import '../css/header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempFlip: false,
    };
  }

  componentDidMount() {
    this.getLocation();
    this.tempClick();
  }

  getLocation = () => {
    let latitude, longitude;
    const { dispatch } = this.props;
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        dispatch(fetchWeather(latitude, longitude));
      });
    } else {
      /* geolocation IS NOT available */
      alert("Location not provided; defaulting to Sunny Weather.")
    }
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  tempClick() {
    let text = '';
    if (this.props.tempC && this.props.tempF) {
      if (this.state.tempFlip === true) {
        text = `${this.props.tempC} °C`;
      }
      else if (this.state.tempFlip === false) {
        text = `${this.props.tempF} °F`;
      }
      return (
        <div
          className='temperature'
          onClick={() => this.setState({ tempFlip: !this.state.tempFlip })}
        >{text}</div>
      );
    }
  }

  changeWeather(e) {
    e.preventDefault();
    const location = e.target.location.value;
    this.props.dispatch(fetchWeather('_', '_', location));
    e.target.location.value = '';
  }

  errorMsg() {
    if (this.props.error) {
      return (
        <div>
          {this.props.error}
        </div>
      );
    }
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let links;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
      links = (
        <div className="links">
          <Link to={'/discover'}>Discover</Link>
          <Link to={'/playlists'}>Playlist Page</Link>
        </div>
      );
    }
    return (
      <div className="header-bar">
        {links}
        {this.tempClick()}
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  tempC: state.weather.tempC,
  tempF: state.weather.tempF,
  error: state.weather.error
});

export default connect(mapStateToProps)(HeaderBar);
