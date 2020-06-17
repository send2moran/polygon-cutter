import React from 'react';
import { CanvasCutter } from './index';
import { shallow } from 'enzyme';

describe('Main App wrapper', () => {
  it('should initialize correctly', () => {
    const wrapper = shallow(<CanvasCutter />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.state().imageSrc).toBe(null);
    expect(wrapper.state().showPopup).toBe(false);
    expect(wrapper.find('.introPopup').exists()).toBe(false);
    expect(wrapper.find('.imageSelector').exists()).toBe(true);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(false);
    expect(wrapper.find('.baseImage').exists()).toBe(false);
    expect(wrapper.find('.imageParts').exists()).toBe(false);
    expect(wrapper.find('.guiLayer').exists()).toBe(false);
  });

  it('should show the image once loaded', () => {
    const wrapper = shallow(<CanvasCutter />);
    const imageSelector = wrapper.find('.imageSelector');
    imageSelector.simulate('imageSelected', 'SOME IMAGE');
    expect(wrapper.state().imageSrc).toBe('SOME IMAGE');
    expect(wrapper.state().parts).toEqual([]);
    expect(wrapper.state().showPopup).toBe(true);
    expect(wrapper.find('.introPopup').exists()).toBe(true);
    expect(wrapper.find('.imageSelector').exists()).toBe(false);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(true);
    expect(wrapper.find('.baseImage').exists()).toBe(true);
    expect(wrapper.find('.imageParts').exists()).toBe(true);
    expect(wrapper.find('.guiLayer').exists()).toBe(true);
  });

  it('should reset all when clicking reset', () => {
    const wrapper = shallow(<CanvasCutter />);
    wrapper.find('.imageSelector').simulate('imageSelected', 'SOME IMAGE');
    wrapper.find('.introPopup').simulate('close');
    expect(wrapper.state().showPopup).toBe(false);
    wrapper.find('.resetSceneButton').simulate('click');
    expect(wrapper.state().imageSrc).toBe(null);
    expect(wrapper.find('.imageSelector').exists()).toBe(true);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(false);
    expect(wrapper.find('.baseImage').exists()).toBe(false);
    expect(wrapper.find('.imageParts').exists()).toBe(false);
    expect(wrapper.find('.guiLayer').exists()).toBe(false);
  });

  it('should add image part for each shape created', () => {
    const wrapper = shallow(<CanvasCutter />);
    expect(wrapper.state().parts.length).toBe(0);
    expect(wrapper.find('.draggablePart').length).toBe(0);
    expect(wrapper.find('.partHole').length).toBe(0);
    wrapper.find('.imageSelector').simulate('imageSelected', 'SOME IMAGE');
    wrapper
      .find('.guiLayer')
      .simulate('shapeComplete', [[0, 0], [1, 0], [0, 1], [0, 0]]);
    expect(wrapper.state().parts.length).toBe(1);
    expect(wrapper.find('.draggablePart').length).toBe(1);
    expect(wrapper.find('.partHole').length).toBe(1);
  });
});
