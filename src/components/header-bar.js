import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../css/header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempFlip: false,
    };
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

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let links;
    if (this.props.loggedIn) {
      logOutButton = (
        <div>
          <button onClick={() => this.logOut()}>Log out</button>
        </div>
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
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  tempC: state.weather.tempC,
  tempF: state.weather.tempF
});

export default connect(mapStateToProps)(HeaderBar);
