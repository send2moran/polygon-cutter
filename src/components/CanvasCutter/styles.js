import styled from 'styled-components';
import { Button } from './components/shared/components/Button';

export const CanvasCutterWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
export const ImagesContainer = styled.div`
  position: relative;
`;
export const BaseImage = styled.img`
  max-height: 100vh;
`;
export const ImagePartsContainer = styled.div`
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
`;
export const ResetButton = styled(Button)`
  position: absolute;
  right: 0px;
  left: 0px;
  z-index: 999;
  background-color: rgba(255,255,255,0.2);
  color: white;
  width:100%;
  margin:auto;
`;
