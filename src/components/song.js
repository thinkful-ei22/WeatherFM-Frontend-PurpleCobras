import React from 'react';
import ReactPlayer from 'react-player';


export class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
    muted: false,
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

  render(){
    const { url, playing, volume, muted} = this.state;
    return(
      <div class="song-container">

       <ReactPlayer 
       url={this.props.url} 
       playing={playing}
       onPlay={this.onPlay}
       onPause={this.onPause}
       volume={volume}
       muted={muted}
       height='0%'
       width='0%'

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