import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotifySlider } from '../actions/spotifySlider';
import { fetchSpotify } from '../actions/spotify';
import '../css/slider.css';

export class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySlider: false,
            danceability: .5,
            energy: .5,
            popularity: 40,
            valence: .5,
            loudness: -30,
            acousticness: .5
        };
    }
    componentDidMount() {
        //get spotify average settings???
        //than store that and use it to set the default settings for slider....
    }

    handleSlider(e) {
        e.preventDefault();
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
        this.props.dispatch(fetchSpotify(this.props.weather))
    }

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
                <div>
                    <form onSubmit={(e) => this.handleSlider(e)} className="slider">
                        <div className="dancy">
                            <label htmlFor="danceability">Not Dancy</label>
                            <input type="range" id="danceability" name="danceability"
                                min="0" max="1" defaultValue=".5" step=".01"
                                onChange={(e) => this.setState({danceability: e.target.value})}
                                value={this.state.danceability} />
                            <label htmlFor="danceability">Super Dancy: {Math.floor(this.state.danceability * 100)}%</label>
                        </div>
                        <div className="energy">
                            <label htmlFor="energy">Low Energy</label>
                            <input type="range" id="energy" name="energy"
                                min="0" max="1" defaultValue=".5" step=".01"
                                onChange={(e) => this.setState({energy: e.target.value})}
                                value={this.state.energy} />
                            <label htmlFor="energy">High Energy: {Math.floor(this.state.energy * 100)}%</label>
                        </div>
                        <div className="popularity">
                            <label htmlFor="popularity">Less Popular</label>
                            <input type="range" id="popularity" name="popularity"
                                min="10" max="80" defaultValue="30" step="1"
                                onChange={(e) => this.setState({popularity: e.target.value})}
                                value={this.state.popularity} />
                            <label htmlFor="popularity">More Popular: {this.state.popularity}%</label>
                        </div>
                        <div className="valence">
                            <label htmlFor="valence">Sad</label>
                            <input type="range" id="valence" name="valence"
                                min="0" max="1" defaultValue=".5" step=".01"
                                onChange={(e) => this.setState({valence: e.target.value})}
                                value={this.state.valence} />
                            <label htmlFor="valence">Happy: {Math.floor(this.state.valence * 100)}%</label>
                        </div>
                        <div className="volume">
                            <label htmlFor="loudness">Softer</label>
                            <input type="range" id="loudness" name="loudness"
                                min="-60" max="0" defaultValue="-30" step="1"
                                onChange={(e) => this.setState({loudness: e.target.value})}
                                value={this.state.loudness} />
                            <label htmlFor="loudness">Louder: {this.state.loudness}dBs (-60 to 0)</label>
                        </div>
                        <div className="acousticness">
                            <label htmlFor="acousticness">Less Acoustic</label>
                            <input type="range" id="acousticness" name="acousticness"
                                min="0" max="1" defaultValue=".5" step=".01"
                                onChange={(e) => this.setState({acousticness: e.target.value})}
                                value={this.state.acousticness} />
                            <label htmlFor="acousticness">More Acoustic: {Math.floor(this.state.acousticness * 100)}%</label>
                        </div>
                        <button type="submit">Customize!</button>
                    </form>
                    <button onClick={() => this.resetSettings()}>Reset to Weather Settings</button>
                </div>

        }
        return (
            <div className="slider">
                <button onClick={() => this.toggleSliderDisplay()}>{sliderMessage}</button>
                {sliderForm}
            </div>
        );
    }
}

const mapStateToProps = state => ({
        weather: state.weather.weather,
        url: state.youtube.videoURL
});

export default requiresLogin()(connect(mapStateToProps)(Slider));
