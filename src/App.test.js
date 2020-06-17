import React from 'react';
import App from './App';
import { shallow} from 'enzyme';

describe("Main App wrapper",()=>{
  it('renders without crashing', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.length).toBe(1);
  });
})
