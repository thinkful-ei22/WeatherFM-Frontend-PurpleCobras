import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotifySlider } from '../actions/spotifySlider';
import { fetchSpotify } from '../actions/spotify';

export class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySlider: false
        };
    }
    componentDidMount() {
        //get spotify average settings???
        //than store that and use it to set the default settings for slider....
    }

    handleSlider(e) {
        e.preventDefault();
        console.log("NEW URLLLLL", this.props.url)
        let sliderObj = {
            danceability: e.target.danceability.value,
            energy: e.target.energy.value,
            popularity: e.target.popularity.value,
            valence: e.target.valence.value,
            loudness: e.target.loudness.value,
            acousticness: e.target.acousticness.value
        };
        console.log(sliderObj);
        this.props.dispatch(fetchSpotifySlider(sliderObj))
    }

    resetSettings() {
        console.log("RESET SETTINGS");
        this.props.dispatch(fetchSpotify(this.props.weather))
    }
    //should add a switch statement with default settings for all these weathers....
    //based on the average from our initial songs...

    toggleSliderDisplay() {
        this.setState({
            displaySlider: !this.state.displaySlider
        })
    }
    render() {
        let sliderForm = '';
        let sliderMessage = 'Show Advanced Settings'
        if (this.state.displaySlider === true) {
            sliderMessage = "Hide Advanced Settings"
            sliderForm =
                <fieldset>
                    <form onSubmit={(e) => this.handleSlider(e)}>
                        <label htmlFor="danceability">Danceability</label>
                        <input type="range" id="danceability" name="danceability"
                            min="0" max="1" defaultValue=".5" step=".01" />
                        <label htmlFor="energy">Energy</label>
                        <input type="range" id="energy" name="energy"
                            min="0" max="1" defaultValue=".5" step=".01" />
                        <label htmlFor="popularity">Popularity</label>
                        <input type="range" id="popularity" name="popularity"
                            min="10" max="80" defaultValue="30" step="1" />
                        <label htmlFor="valence">Valence</label>
                        <input type="range" id="valence" name="valence"
                            min="0" max="1" defaultValue=".5" step=".01" />
                        <label htmlFor="loudness">Loudness</label>
                        <input type="range" id="loudness" name="loudness"
                            min="-60" max="0" defaultValue="-30" step=".5" />
                        <label htmlFor="acousticness">acousticness</label>
                        <input type="range" id="acousticness" name="acousticness"
                            min="0" max="1" defaultValue=".5" step=".01" />
                        <button type="submit">Customize!</button>
                    </form>
                    <button onClick={() => this.resetSettings()}>Reset to Weather Settings</button>
                </fieldset>
        }
        return (
            <div className="slider">
                <button onClick={() => this.toggleSliderDisplay()}>{sliderMessage}</button>
                {sliderForm}
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
        weather: state.weather.weather,
        url: state.youtube.videoURL
    };
};

export default requiresLogin()(connect(mapStateToProps)(Slider));
