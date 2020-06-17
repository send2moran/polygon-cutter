import React from 'react';
import { Popup } from './index';
import { shallow } from 'enzyme';

const props = {
  closeText: 'Close',
  popupText: 'Some Text',
  onClose: jest.fn()
};

describe('Popup', () => {
  it('should show the text from props', () => {
    const wrapper = shallow(<Popup {...props} />);
    expect(wrapper.find('.popupText').text()).toBe('Some Text');
    expect(wrapper.find('.closeButton').text()).toBe('Close');
  });
  it('should dispatch onClose when clicking on closePopup button', () => {
    const wrapper = shallow(<Popup {...props} />);
    wrapper.find('.closeButton').simulate('click');
    expect(props.onClose).toBeCalled();
  });
});
