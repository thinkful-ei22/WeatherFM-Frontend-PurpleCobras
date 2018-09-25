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
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  render(){
    const { url, playing, volume, muted, played} = this.state;
    return(
      <div className="song-container">

       <ReactPlayer 
       url={this.props.url} 
       playing={playing}
       onPlay={this.onPlay}
       onPause={this.onPause}
       volume={volume}
       muted={muted}
       height='0%'
       width='0%'
       onSeek={e => console.log('onSeek', e)}
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