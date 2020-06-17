import styled from 'styled-components';

export const DrawCanvas = styled.canvas`
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: ${(props) => props.width}px;
    height ${(props) => props.height}px;
`

export const GUILayerWrapper = styled.div`
  position: absolute;
  top: 0;
`
