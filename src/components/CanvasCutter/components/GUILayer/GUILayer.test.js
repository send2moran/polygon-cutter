import React from 'react';
import { GUILayer } from './index';
import { shallow } from 'enzyme';

const props = {
  dimensions: {
    height: 100,
    width: 100
  },
  onShapeComplete: jest.fn()
};

const MOCK_BOUNDS = { top: 0, left: 0 };
const MOCK_CONTEXT = {
  beginPath: jest.fn(),
  setLineDash: jest.fn(),
  clearRect: jest.fn(),
  closePath: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn()
};

const getWrapper = () => shallow(<GUILayer {...props} />);
describe('GUILayer', () => {
  beforeEach(props.onShapeComplete.mockReset);
  it('should start with initial state', () => {
    const wrapper = getWrapper();
    expect(wrapper.state()).toEqual({
      isDrawing: false,
      shape: []
    });
    expect(wrapper.find('.drawingArea').exists()).toBe(true);
  });
  it('should change drawing state to true when clicked', () => {
    const wrapper = getWrapper();
    wrapper.instance().setBounds(MOCK_BOUNDS);
    wrapper.instance().setContext2D(MOCK_CONTEXT);
    wrapper
      .find('.drawingArea')
      .simulate('mouseDown', { clientX: 1, clientY: 2 });
    expect(wrapper.state()).toEqual({
      isDrawing: true,
      shape: [[1, 2]]
    });
  });

  it('should change drawing state to false on mouse leave,and dispatch onShapeComplete', () => {
    const wrapper = getWrapper();
    const drawingArea = wrapper.find('.drawingArea');
    wrapper.instance().setBounds(MOCK_BOUNDS);
    wrapper.instance().setContext2D(MOCK_CONTEXT);
    drawingArea.simulate('mouseDown', { clientX: 100, clientY: 200 });
    drawingArea.simulate('mouseMove', { clientX: 200, clientY: 300 });
    drawingArea.simulate('mouseUp', { clientX: 300, clientY: 400 });
    expect(wrapper.state()).toEqual({
      isDrawing: false,
      shape: [[100, 200], [200, 300], [300, 400], [100, 200]]
    });
    expect(props.onShapeComplete).toBeCalledWith([
      [100, 200],
      [200, 300],
      [300, 400],
      [100, 200]
    ]);
  });
  it('should prevent small shapes from being created', () => {
    const wrapper = getWrapper();
    const drawingArea = wrapper.find('.drawingArea');
    wrapper.instance().setBounds(MOCK_BOUNDS);
    wrapper.instance().setContext2D(MOCK_CONTEXT);
    drawingArea.simulate('mouseDown', { clientX: 1, clientY: 2 });
    drawingArea.simulate('mouseMove', { clientX: 2, clientY: 3 });
    drawingArea.simulate('mouseUp', { clientX: 3, clientY: 4 });
    expect(wrapper.state()).toEqual({
      isDrawing: false,
      shape: [[1, 2], [2, 3], [3, 4], [1, 2]]
    });
    expect(props.onShapeComplete).not.toBeCalled();
  });
});
