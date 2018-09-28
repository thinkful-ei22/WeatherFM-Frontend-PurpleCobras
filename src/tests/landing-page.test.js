import React from 'react';
import {shallow} from 'enzyme';
import {LandingPage} from '../components/landing-page';

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <LandingPage dispatch={()=>{}} 
        loggedIn={{}}/>);
  });
});
