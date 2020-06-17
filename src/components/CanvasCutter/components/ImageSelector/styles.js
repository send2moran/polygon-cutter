import styled from 'styled-components';
import { Button } from '../shared/components/Button';

const boxDimensions = {
  width: 400,
  height: 200
};

export const PreviewImage = styled.img`
  width: 400px;
`

export const PreviewWrapper = styled.div`
  width: ${boxDimensions.width}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SelectButton = styled(Button)`
  margin: 10px;
  background-color: #759650;
  border-radius: 20px;
`

export const ImageSelectorWrapper = styled.div`
display: flex;
flex-sirection: column;
justify-content: center;
align-items: center;
`

export const FileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: relative;
  top: -${boxDimensions.height}px;
  cursor: pointer;
`

export const FileInputBox = styled.div`
  background-color: #759650;
  border-radius: 150px;
  color: white;
  width: 400px;
  height: 200px;
`

export const IconWrapper = styled.span`
  font-size: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FileInputText = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 400px;
height: 200px;
`
