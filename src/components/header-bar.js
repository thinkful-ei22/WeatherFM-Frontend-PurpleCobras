import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {fetchWeather} from '../actions/weather';
import {clearAuthToken} from '../local-storage';
import '../css/header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempFlip: false,
    };
  }

  componentDidMount(){
    this.tempClick();
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  tempClick () {
    let text = '';
    if(this.props.tempC && this.props.tempF){
      if(this.state.tempFlip === false){
        text = `${this.props.tempC} °C`;
      }
      else if(this.state.tempFlip === true){
        text = `${this.props.tempF} °F`;
      }
      return(
        <div 
          className='temperature'
          onClick={() => this.setState({tempFlip: !this.state.tempFlip})}
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
    console.log(this.props.error);
    if(this.props.error){
      return(
        <div>
          {this.props.error}
        </div>
      );
    }
  }

  render() {
    // console.log(this.props.tempC, this.props.tempF);
    // Only render the log out button if we are logged in
    let logOutButton;
    let links;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
      links = (
        <div className="links">
          <Link to={'/dashboard'}>Dashboard</Link>
          <Link to={'/discover'}>Discover</Link>
          <Link to={'/playlists'}>Playlist Page</Link>
        </div>
      );
    }
    return (
      <div className="header-bar">
        {links}
        {this.tempClick()}
        <form name="changeWeather" onSubmit={(e) => this.changeWeather(e)}>
          <div className='location-error'>
            {this.errorMsg()}
          </div>
          <input name="location" autoComplete="off" placeholder="Wanna change your location? Enter a City or Zip"></input>
          <button type="submit">Change location</button>
        </form>
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
