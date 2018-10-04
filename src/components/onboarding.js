import React from 'react';
import requiresLogin from './requires-login';
import {Link} from 'react-router-dom';
import {changeSongs} from '../actions/playlists';

export class Onboarding extends React.Component {
  constructor() {
    super()
    this.state = {
      sunny: [],
      rainy: [],
      drizzle: [],
      snowy: [],
      cloudy: [],
      thunderstorm: []
    }
  }

  addWeather (e, weather) {
    e.preventDefault();
    if (this.state[weather].length < 5) {
      this.setState({
        [weather]: [...this.state[weather], {songTitle: e.target.song.value, artist: e.target.artist.value}]
      })
    }
  }

  // sunny, rainy, drizzle, snowy, cloudy, thunderstorm

  addAllSongs (e, sunny, rainy, drizzle, snowy, cloudy, thunderstorm) {
    console.log(sunny);
    e.preventDefault();
    this.props.dispatch(changeSongs(sunny, rainy, drizzle, snowy, cloudy, thunderstorm));
  }


  render() {

    let state = this.state;

    const renderSongs = (weather) => {
      console.log(state[weather]);
        return state[weather].map(item => {
          return <li key={item.songTitle}>{item.songTitle}, {item.artist}<br /></li>
        })
    }

    return (
      <div>
        <h1>Onboarding Page</h1>

          <h3>Add Sunny Tracks</h3>
          <ul>{renderSongs("sunny")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "sunny")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />

          <h3>Add Rainy Tracks</h3>
          <ul>{renderSongs("rainy")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "rainy")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />

          <h3>Add Drizzle Tracks</h3>
          <ul>{renderSongs("drizzle")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "drizzle")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />

          <h3>Add Snowy Tracks</h3>
          <ul>{renderSongs("snowy")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "snowy")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />

          <h3>Add Cloudy Tracks</h3>
          <ul>{renderSongs("cloudy")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "cloudy")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />

          <h3>Add Thunderstorm Tracks</h3>
          <ul>{renderSongs("thunderstorm")}</ul><br /><br />

          <form onSubmit={(e) => this.addWeather(e, "thunderstorm")}>
            <label htmlFor="song">Song Title:</label>
            <input name="song"></input>
            <label htmlFor="artist"> Artist Name:</label>
            <input name="artist"></input><br /><br />

            <button type="submit">Add a Song</button>
              
          </form><br />
        
        <form onSubmit={e => this.addAllSongs(
            e,
            this.state.sunny, 
            this.state.rainy, 
            this.state.drizzle, 
            this.state.snowy, 
            this.state.cloudy, 
            this.state.thunderstorm
          )}>
          <button type="submit">Add Songs</button>
          <Link to="/dashboard"><button type="submit">Skip (Go to Dashboard)</button></Link>
        </form><br />
      
      </div>
  )}
}

export default requiresLogin()(Onboarding);