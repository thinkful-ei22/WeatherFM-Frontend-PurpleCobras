import React from 'react';
import {shallow} from 'enzyme';
import {Discover} from '../components/discover';

describe('<Discover/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Discover dispatch={()=>{}} 
        username={()=>{}}
        returnSong={()=>{}} 
        name={{}} 
        weather={{}} 
        spotifyList={{}} 
        url={{}}/>);
  });
});
