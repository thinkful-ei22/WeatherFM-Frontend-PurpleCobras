import React from 'react';
import ReactPlayer from 'react-player';


export class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: null,
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0
    }
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  // seeking 

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
    console.log(e.target.value)
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    if (this.player) {
      console.log('seeking');
      this.setState({ seeking: false });
      this.player.seekTo(parseFloat(e.target.value));
    }
  }

  onProgress = state => {
    // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  ref = player => {
    this.player = player
  }

  render(){
    const { url, playing, volume, muted, played } = this.state;

    return(
      <div className="song-container">

       <ReactPlayer 
       ref={this.ref}
       url={this.props.url} 
       config={{
        youtube: {
          playerVars: { showinfo: 1 }
        }
       }}
       playing={playing}
       onPlay={this.onPlay}
       onPause={this.onPause}
       volume={volume}
       muted={muted}
       height='0%'
       width='0%'
       onSeek={e => console.log('onSeek', e)}
       onProgress={this.onProgress}
       />
<section>
       <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                {/* <button onClick={this.stop}>Stop</button> */}
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
              </td>
            </tr>

            <tr>
              <th>Seek</th>
              <td>
                <input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            
            <tr>
              <th>Volume</th>
              <td>
                <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor='muted'>Muted</label>
              </th>
              <td>
                <input id='muted' type='checkbox' checked={this.state.muted} onChange={this.toggleMuted} />
              </td>
            </tr>
          </tbody></table>
        </section>
</div>
    )
  }
}

export default Song;