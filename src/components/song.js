import React from 'react';
import ReactPlayer from 'react-player';
import '../css/player.css';


export class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      volumeIcon: 'volume_up'
    }
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  onPlay = () => {
    //console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    //console.log('onPause')
    this.setState({ playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value), muted: false },
    () => {
      if (this.state.volume === 0){
        this.setState({
          volumeIcon: 'volume_mute'
        })
      }
      else if (this.state.volume >= 0.1 && this.state.volume <= 0.5){
        this.setState({
          volumeIcon: 'volume_down'
        })
      }
      else if (this.state.volume > 0.5){
        this.setState({
          volumeIcon: 'volume_up'
        })
      }
    })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted },
      () =>{
        if (this.state.muted){
          this.setState({
            volumeIcon: 'volume_off'
          })
        }
        else if (this.state.volume === 0){
          this.setState({
            volumeIcon: 'volume_mute'
          })
        }
        else if (this.state.volume >= 0.1 && this.state.volume <= 0.5){
          this.setState({
            volumeIcon: 'volume_down'
          })
        }
        else if (this.state.volume > 0.5){
          this.setState({
            volumeIcon: 'volume_up'
          })
        }
      })
  }

  // seeking 

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
    //console.log(e.target.value)
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    if (this.player) {
      //console.log('seeking');
      this.setState({ seeking: false });
      this.player.seekTo(parseFloat(e.target.value));
    }
  }

  onProgress = state => {
    //console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  

  ref = player => {
    this.player = player
  }

  render(){
    const {playing, volume, muted, played } = this.state;

    return(
      <div className="song-container">
        <ReactPlayer
          ref={this.ref}
          width='100%'
          height='100%'
          url={this.props.url} 
          playing={playing}
          volume={volume}
          controls={true}
          muted={muted}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onSeek={e => console.log('onSeek', e)}
          onEnded={this.props.onEnded}
          onProgress={this.onProgress}
        />


        <section className="player">
          <table><tbody>
            <tr>
              <td id="play">
                {/* <button onClick={this.stop}>Stop</button> */}
                <button onClick={this.props.onPrevClick} className="playButtons"><i className="material-icons">skip_previous</i></button>
                <button onClick={this.playPause} className="playButtons">{playing ? <i className="material-icons">pause</i> : <i className="material-icons">play_arrow</i>}</button>
                <button onClick={this.props.onNextClick} className="playButtons"><i className="material-icons">skip_next</i></button>
              </td>
              <td>
              {/* <input type="range" name="weight" id="range_weight" value="5" min="1" max="100" /> */}
                <input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                  id="seek"
                />
              </td>
            </tr>
            <tr>
              
            </tr>
            <tr>
              {/* Volume */}
    
              <th><button onClick={this.toggleMuted}id="volumeButton"><i className="material-icons">{this.state.volumeIcon} </i></button></th>
              <td>
                <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} id="volume"/>
              </td>
            </tr>
            <tr>
             
            </tr>
          </tbody></table>
        </section>
      </div>
    )
  }
}

export default Song;