import styled from 'styled-components';

export const ClippedImageWrapper = styled.div`
    position: relative;
    height: 0;
    width: 0;
    &:hover .removeButton {
      opacity: 1;
    }
    left: ${(props) => props.offset[0]}px;
    top: ${(props) => props.offset[1]}px;
`;

export const IconWrapper = styled.div`
  color: white;
  position: absolute;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
`;

export const ClippedImageCanvas = styled.canvas`
    position: relative;
    top: 0;
    left: 0;
    display: 'block';
    cursor: ${(props) => props.isDraggable && (props.isDrag ? 'grabbing' : 'grab')};
    filter: ${(props) => (props.isDraggable ? 'drop-shadow(0 5px 10px #000)' : null)};
    width: ${(props) => props.dimensions[0]}px;
    height: ${(props) => props.dimensions[1]}px;
`;
