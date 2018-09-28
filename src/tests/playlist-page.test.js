import React from 'react';
import {shallow} from 'enzyme';
import {PlaylistPage} from '../components/playlist-page';

describe('<PlaylistPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <PlaylistPage dispatch={()=>{}} 
        playlists={{}} 
        user={{}}
        username={{}}/>);
  });
});