import React from 'react';
import { ImageSelector } from './index';
import { shallow } from 'enzyme';

const props = {
  onImageSelected: jest.fn()
};
const getWrapper = (additionalProps = {}) =>
  shallow(<ImageSelector {...props} />);

describe('ImageSelector', () => {
  beforeEach(() => {
    props.onImageSelected.mockReset();
  });
  it('should initialize with no image loaded', () => {
    const wrapper = getWrapper();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.previewImage').exists()).toBe(false);
    expect(wrapper.find('#fileSelection').exists()).toBe(true);
    expect(wrapper.find('.selectImageButton').exists()).toBe(false);
    expect(wrapper.find('.selectImageText').text()).toBe('Select an image');
  });
  it('should show image once input loaded', () => {
    const wrapper = getWrapper();
    wrapper.instance().onReaderOnload({ target: { result: 'IMAGE_DATA' } });
    expect(wrapper.state().imageSrc).toBe('IMAGE_DATA');
    expect(wrapper.find('.previewImage').exists()).toBe(true);
    expect(wrapper.find('#fileSelection').exists()).toBe(true);
    expect(wrapper.find('.selectImageButton').exists()).toBe(true);
  });
  it('should call onImageSelected when pressing the Select button', () => {
    const wrapper = getWrapper();
    wrapper.instance().onReaderOnload({ target: { result: 'IMAGE_DATA' } });
    wrapper.find('.selectImageButton').simulate('click');
    expect(props.onImageSelected).toBeCalled();
    expect(props.onImageSelected).toBeCalledWith('IMAGE_DATA');
  });
});
