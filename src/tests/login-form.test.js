import React from 'react';
import {shallow} from 'enzyme';
import {LoginForm} from '../components/login-form';

describe('<LoginForm/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <LoginForm dispatch={()=>{}} 
        handleSubmit={()=>{}}/>);
  });
});
