import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import '../css/dashboard.css';

 
export class Dashboard extends React.Component  {
      
  render() {

    // console.log("THE WEATHER", this.props.weather)

    //to add the spinner
    let weather;
    if (this.props.weather === 'loading...') {
      weather = <div class="lds-circle"></div>;
    } else {
      weather = <div>Right now it is {this.props.weather}!</div>;
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
          <Link to={'/discover'} className="">Discover</Link>
          <Link to={'/playlists'} className="">Playlist Page</Link>
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
