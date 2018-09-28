import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from '../components/dashboard';

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Dashboard dispatch={()=>{}} 
        getLocation={()=>{}} 
        username={()=>{}} 
        name={{}} 
        protectedData={true} 
        weather={{}}/>);
  });
});
