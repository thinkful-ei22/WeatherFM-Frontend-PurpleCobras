import React from 'react';
<<<<<<< HEAD
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
=======
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
>>>>>>> dc6ba37e711eb6e96e46fbf4b74275d558ef0cb4
import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import '../css/landing-page.css';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      register: false
    }
  }

  returnForm() {
    if (this.state.login) {
      return <div className="bigCont"><LoginForm /></div>
    }
    if (this.state.register) {
      return <div className="bigCont"><RegistrationForm /></div>
    }
  }

<<<<<<< HEAD
  // If we are logged in redirect straight to the user's dashboard

  render() {
  if (this.props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

    return (
      <div className="landingCont">  
        <div className="image"></div>
        <div className="buttons">
          <div className="button" onClick={() => {
            this.setState({
              login: !this.state.login,
              register: false
            })
          }}>login to weather FM</div>
          <div className="button" onClick={() => {
            this.setState({
              register: !this.state.register,
              login: false
            })
          }}>register with us</div>
        </div>
        <div className="info">
            <h2><span>Weather FM</span> ® is a mood-music app that <span>personalizes</span> the way you experience weather.</h2>
            {this.returnForm()}
        </div>
      </div>
    );
  }
=======
export function LandingPage(props) {
  // If we are logged in redirect straight to the user's discover
  if (props.loggedIn) {
    return <Redirect to="/discover" />;
  }

  return (
    <div className="home">
      <h1>Weather FM Radio</h1>
      <LoginForm />
    </div>
  );
>>>>>>> dc6ba37e711eb6e96e46fbf4b74275d558ef0cb4
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
