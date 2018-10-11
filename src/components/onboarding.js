import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {changeSongs, clearInvalid} from '../actions/playlists';
import '../css/onboarding.css';
import OnboardingForm from './onboarding-form';

export class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sunny: [],
      rainy: [],
      drizzle: [],
      snowy: [],
      cloudy: [],
      thunderstorm: [],
      deleted: false,
      submitted: false,
      addSongs: false,
      skip: true
    };
  }

  addWeather(e, weather) {
    e.preventDefault();
    if (this.state[weather].length < 5) {
      this.setState({
        [weather]: [...this.state[weather], {songTitle: e.target.song.value, artist: e.target.artist.value}],
        addSongs: true,
        skip: false
      });
    }
    e.target.song.value='';
    e.target.artist.value='';
  }

  addAllSongs(e, sunny, rainy, drizzle, snowy, cloudy, thunderstorm) {
    e.preventDefault();
    this.props.dispatch(changeSongs(sunny, rainy, drizzle, snowy, cloudy, thunderstorm))
      .then(() => {
        this.setState({
          submitted: true
        });
      });
  }

  deleteSong(e, title, weather) {
    e.preventDefault();
    let weatherArray = this.state[weather];
    for (let i = 0; i < weatherArray.length + 1; i++) {
      if (weatherArray[i].songTitle === title) {
        weatherArray.splice(i, 1);
        break;
      }
    }
    this.setState({
      deleted: true
    });
  }

  highlight(songTitle){
    if(this.props.invalid){
      // console.log(this.props.invalid.map(song => song.songTitle === songTitle));
      const [arr] = this.props.invalid.map(song => song.songTitle === songTitle);
      return arr ? 'red': 'black';
    } else {
      return 'black';
    }
    this.props.dispatch(clearInvalid());
  }

  render() {
    let state = this.state;
    if (state.submitted && !this.props.invalid) {
      return <Redirect to="/discover" />;
    }

    let buttonType;
    if (state.skip) {
      buttonType = <button type="submit">Skip (Go to Dashboard)</button>;
    } 
    if (state.addSongs) {
      buttonType = <button type="submit">Add Songs</button>;
    }


    const renderSongs = (weather) => {
      
      return state[weather].map(item => {
        return <li style={{
          color: this.highlight(item.songTitle)}} key={item.songTitle}>+ {item.songTitle} by {item.artist} 
          <button onClick={(e) => this.deleteSong(e, item.songTitle, weather)} title="delete song">✖</button><br />
        </li>;
      });
      //unreachable code
      this.setState({
        deleted: false,
      });
    };

    

    return (
      <div className="onboardingCont">

        <div className="gridCont">
          <div className="gridItem item1">
          
            <div className="instructions">
            welcome to our app! please input your personal songs for the weather - or don't and we'll do it for you.
            </div>

            <form onSubmit={e => this.addAllSongs(
              e,
              this.state.sunny, 
              this.state.rainy, 
              this.state.drizzle, 
              this.state.snowy, 
              this.state.cloudy, 
              this.state.thunderstorm
            )}>

              {buttonType}
              

            </form>

            <span className="error">{this.props.invalid? 'Highlighted songs returned without a match. Please re-enter.' : ''}</span>

            <div className="lists">
              <div className="listTitle" style={{marginTop: 15}}>Sunny</div>
              <ul>{renderSongs('sunny')}</ul>
              <div className="listTitle">Rainy</div>
              <ul>{renderSongs('rainy')}</ul>
              <div className="listTitle">Drizzle</div>
              <ul>{renderSongs('drizzle')}</ul>
              <div className="listTitle">Snowy</div>
              <ul>{renderSongs('snowy')}</ul>
              <div className="listTitle">Cloudy</div>
              <ul>{renderSongs('cloudy')}</ul>
              <div className="listTitle">Thunderstorm</div>
              <ul>{renderSongs('thunderstorm')}</ul>
            </div>

          </div>

          <div className="gridItem">
            <h3>Sunny Tracks</h3>
            <form name="addWeather" onSubmit={(e) => this.addWeather(e, 'sunny')}>
              <OnboardingForm />
            </form>
          </div>

          <div className="gridItem">
            <h3>Rainy Tracks</h3>
            <form name="addWeather2" onSubmit={(e) => this.addWeather(e, 'rainy')}>
              <OnboardingForm />      
            </form>
          </div>

          <div className="gridItem">
            <h3>Drizzle Tracks</h3>
            <form name="addWeather" onSubmit={(e) => this.addWeather(e, 'drizzle')}>
              <OnboardingForm />
            </form>
          </div>

          <div className="gridItem">
            <h3>Snowy Tracks</h3>
            <form name="addWeather" onSubmit={(e) => this.addWeather(e, 'snowy')}>
              <OnboardingForm />  
            </form>
          </div>

          <div className="gridItem">
            <h3>Cloudy Tracks</h3>
            <form name="addWeather" onSubmit={(e) => this.addWeather(e, 'cloudy')}>
              <OnboardingForm />
            </form>
          </div>

          <div className="gridItem">
            <h3>Thunderstorm Tracks</h3>
            <form name="addWeather" onSubmit={(e) => this.addWeather(e, 'thunderstorm')}>
              <OnboardingForm />
            </form>
          </div>

        </div>
        <br />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  invalid: state.playlists.invalid
});

export default connect(mapStateToProps)(requiresLogin()(Onboarding));