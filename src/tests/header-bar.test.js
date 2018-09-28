import React from 'react';
import {shallow} from 'enzyme';
import {HeaderBar} from '../components/header-bar';

describe('<HeaderBar/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <HeaderBar dispatch={()=>{}} 
        logOut={()=>{}} 
        LoggedIn={{}}/>);
  });
});