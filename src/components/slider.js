import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotifySlider, fetchSpotifyAverages, updateSpotifyAverages } from '../actions/spotifySlider';
import { fetchSpotify } from '../actions/spotify';
import '../css/slider.css';
import { fetchPlaylists } from '../actions/playlists';
import shuffle from 'shuffle-array';


export class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySlider: false,
        };
    }

    componentDidMount() {
        return this.props.dispatch(fetchPlaylists())
            .then(() => {
                return this.getAttributeAverages();
            })
    }

    handleSlider(e) {
        e.preventDefault();
        let weathPlaylist = this.props.playlists[this.props.weather];
        shuffle(weathPlaylist);
        const ids = ["songId1", "songId2", "songId3"]
        ids.forEach((id, i) => {
            this.props.averages[id] = weathPlaylist[i].spotifyId
        })
        if (!this.props.averages.popularity) {
            this.props.averages.popularity = 20;
        }
        this.props.dispatch(fetchSpotifySlider(this.props.averages))
    }

    resetSettings() {
        this.props.dispatch(fetchSpotify(this.props.weather))
    }

    toggleSliderDisplay() {
        this.setState({
            displaySlider: !this.state.displaySlider
        })
    }

    getAttributeAverages() {
        let currentPlaylist;
        if (this.props.playlists[this.props.weather]) {
            currentPlaylist = this.props.playlists[this.props.weather].slice(0, 5);
            let songIdArray = currentPlaylist.map(song => song.spotifyId);
            shuffle(songIdArray);
            this.props.dispatch(fetchSpotifyAverages(songIdArray));
        }
    }
    onChange(sliderValue) {
        this.props.dispatch(updateSpotifyAverages(sliderValue));
    }

    render() {
        if (!this.props.playlists) {
            return (
                <h2>LOADING</h2>
            )
        }

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
                                min="0" max="1" step=".01"
                                onChange={(e) => this.onChange({ danceability: e.target.value })}
                                defaultValue={this.props.averages.danceability}
                            />
                            <label htmlFor="danceability">Super Dancy: {Math.floor(this.props.averages.danceability * 100)}%</label>
                        </div>
                        <div className="energy">
                            <label htmlFor="energy">Low Energy</label>
                            <input type="range" id="energy" name="energy"
                                min="0" max="1" step=".01"
                                onChange={(e) => this.onChange({ energy: e.target.value })}
                                defaultValue={this.props.averages.energy} />
                            <label htmlFor="energy">High Energy: {Math.floor(this.props.averages.energy * 100)}%</label>
                        </div>
                        <div className="popularity">
                            <label htmlFor="popularity">Less Popular</label>
                            <input type="range" id="popularity" name="popularity"
                                min="10" max="80" step="1"
                                onChange={(e) => this.onChange({ popularity: e.target.value })}
                                defaultValue={this.props.averages.popularity} />
                            <label htmlFor="popularity">More Popular: {this.props.averages.popularity}%</label>
                        </div>
                        <div className="valence">
                            <label htmlFor="valence">Sad</label>
                            <input type="range" id="valence" name="valence"
                                min="0" max="1" step=".01"
                                onChange={(e) => this.onChange({ valence: e.target.value })}
                                defaultValue={this.props.averages.valence} />
                            <label htmlFor="valence">Happy: {Math.floor(this.props.averages.valence * 100)}%</label>
                        </div>
                        <div className="volume">
                            <label htmlFor="loudness">Softer</label>
                            <input type="range" id="loudness" name="loudness"
                                min="-60" max="0" step="1"
                                onChange={(e) => this.onChange({ loudness: e.target.value })}
                                defaultValue={this.props.averages.loudness} />
                            <label htmlFor="loudness">Louder: {Math.floor(this.props.averages.loudness)}dBs (-60 to 0)</label>
                        </div>
                        <div className="acousticness">
                            <label htmlFor="acousticness">Less Acoustic</label>
                            <input type="range" id="acousticness" name="acousticness"
                                min="0" max="1" step=".01"
                                onChange={(e) => this.onChange({ acousticness: e.target.value })}
                                defaultValue={this.props.averages.acousticness} />
                            <label htmlFor="acousticness">More Acoustic: {Math.floor(this.props.averages.acousticness * 100)}%</label>
                        </div>
                        <button type="submit">Customize!</button>
                        <button onClick={() => this.resetSettings()}>Reset to Weather Settings</button>
                    </form>

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
    url: state.youtube.videoURL,
    playlists: state.playlists.playlists,
    averages: state.spotify.averages
});

export default requiresLogin()(connect(mapStateToProps)(Slider));
