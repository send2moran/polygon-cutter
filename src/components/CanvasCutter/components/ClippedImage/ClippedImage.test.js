import React from 'react';
import { ClippedImage } from './ClippedImage';
import { shallow } from 'enzyme';

const props = {
  isDraggable: true,
  imageSrc: {},
  imageDimensions: {},
  onRemove: jest.fn(),
  shape: [[2, 2], [3, 2], [1, 4]]
};

describe('ClippedImage', () => {
  it('should dispatch onRemove when clicked the remove button', () => {
    const wrapper = shallow(<ClippedImage {...props} />);
    expect(wrapper.state().offset).toEqual([1, 2]);
    expect(wrapper.state().dimensions).toEqual([2, 2]);
    wrapper.find('.removeButton').simulate('click');
    expect(props.onRemove).toBeCalled();
  });
  it('should not show removeButton when not draggable', () => {
    const wrapper = shallow(<ClippedImage {...props} isDraggable={false} />);
    expect(wrapper.find('.removeButton').exists()).toBe(false);
  });
  it('should update offset after dragging', () => {
    const wrapper = shallow(<ClippedImage {...props} />);
    expect(wrapper.state().isDrag).toBe(false);
    expect(wrapper.state().lastDragPosition).toBe(null);
    wrapper
      .find('.clippedImage')
      .simulate('mouseDown', { clientX: 0, clientY: 0 });
    expect(wrapper.state().isDrag).toBe(true);
    expect(wrapper.state().offset).toEqual([1, 2]);
    expect(wrapper.state().lastDragPosition).toEqual([0, 0]);
    wrapper
      .find('.clippedImage')
      .simulate('mouseMove', { clientX: 2, clientY: 2 });
    expect(wrapper.state().offset).toEqual([3, 4]);
    expect(wrapper.state().lastDragPosition).toEqual([2, 2]);
    wrapper
      .find('.clippedImage')
      .simulate('mouseUp', { clientX: 4, clientY: 4 });
    expect(wrapper.state().offset).toEqual([5, 6]);
    expect(wrapper.state().isDrag).toBe(false);
    expect(wrapper.state().lastDragPosition).toBe(null);
  });
});
