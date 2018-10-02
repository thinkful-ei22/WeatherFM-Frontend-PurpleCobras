import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchWeather } from '../actions/weather';
import { fetchSpotifySlider } from '../actions/spotifySlider';
import { fetchSpotify } from '../actions/spotify';

export class Slider extends React.Component {
    handleSlider(e) {
        e.preventDefault();
        // console.log(e.target.dance.value)
        let sliderObj = {
            danceability: e.target.danceability.value,
            energy: e.target.energy.value,
            popularity: e.target.popularity.value,
            valence: e.target.valence.value
        };
        console.log(sliderObj);
        this.props.dispatch(fetchSpotifySlider(sliderObj))
        //need to fetch spotify again with weather and these new params.....
    }

    resetSettings() {
        console.log("RESET SETTINGS");
        this.props.dispatch(fetchSpotify(this.props.weather))
    }
//should add a switch statement with default settings for all these weathers....
//based on the average from our initial songs...
    render() {
        return (
            <div className="slider">
                <form onSubmit={(e) => this.handleSlider(e)}>
                    <label htmlFor="danceability">Danceability</label>
                    <input onChange={(e) => console.log(e.target.value)} type="range" id="danceability" name="danceability"
                        min="0" max="1" defaultValue=".5" step=".01" />
                    <label htmlFor="energy">Energy</label>
                    <input onChange={(e) => console.log(e.target.value)} type="range" id="energy" name="energy"
                        min="0" max="1" defaultValue=".5" step=".01" />
                    <label htmlFor="popularity">Popularity</label>
                    <input onChange={(e) => console.log(e.target.value)} type="range" id="popularity" name="popularity"
                        min="0" max="100" defaultValue="30" step="1" />
                    <label htmlFor="valence">Valence</label>
                    <input onChange={(e) => console.log(e.target.value)} type="range" id="valence" name="valence"
                        min="0" max="1" defaultValue=".5" step=".01" />
                    <button type="submit">Customize!</button>
                </form>
                <button onClick={() => this.resetSettings()}>Reset to Weather Settings</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName}`,
        protectedData: state.protectedData.data,
        weather: state.weather.weather
    };
};

export default requiresLogin()(connect(mapStateToProps)(Slider));
