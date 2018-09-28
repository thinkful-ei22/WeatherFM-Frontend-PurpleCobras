import React from 'react';
import {shallow} from 'enzyme';
import {Song} from '../components/song';

describe('<Song/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Song dispatch={()=>{}} 
      playPause={()=>{}}
      onPlay={()=>{}}  
      onPause={()=>{}}
      toggleMuted={()=>{}}
      onSeekMouseDown={()=>{}}
      onSeekChange={()=>{}}
      onSeekMouseUp={()=>{}}
      onProgress={()=>{}}
      setVolume={()=>{}}/>);
  });
});
