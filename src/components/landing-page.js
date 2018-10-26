import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import '../css/landing-page.css';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false
    };
  }

  returnForm() {
    if (this.state.login) {
      return <div className="bigCont"><LoginForm /></div>;
    }
    if (this.state.register) {
      return <div className="bigCont"><RegistrationForm /></div>;
    }
  }

  // If we are logged in redirect straight to the user's dashboard

  render() {
    if (this.props.loggedIn && this.state.login) {
      return <Redirect to="/discover" />;
    }

    if (this.props.loggedIn && this.state.register) {
      return <Redirect to="/onboarding" />;
    }

    return (
      <div className="cont">
        
        <section className="section1">

          <div className="buttonns">
            <button className="buttonn" onClick={() => {
              this.setState({
                login: !this.state.login,
                register: false
              });
            }}>login to weather FM</button>
            <button className="buttonn register" onClick={() => {
              this.setState({
                register: !this.state.register,
                login: false
              });
            }}>register with us</button>
          </div>

        </section>

        <section className="section2">
          <div className="wordCont">
            <h1><span>Weather FM</span> ® is a mood-music app that <span>personalizes</span> the way you experience weather.</h1>
            <div className="formCont">
              {this.returnForm()}
            </div>
          </div>
        </section>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
