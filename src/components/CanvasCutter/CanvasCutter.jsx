import React, {useState, useEffect, useRef, useCallback} from 'react';
import { stateMachine } from '../../stores/stateMachine';
import { useMachine } from '@xstate/react';
import _ from 'lodash';
import {
  CanvasCutterWrapper,
  ImagesContainer,
  BaseImage,
  ImagePartsContainer,
  ResetButton
} from './styles';
import { ImageSelector } from './components/ImageSelector/ImageSelector';
import { GUILayer } from './components/GUILayer/GUILayer';
import { ClippedImage } from './components/ClippedImage/ClippedImage';
import { Popup } from './components/Popup/Popup';
import { messages } from './messages';

export const CanvasCutter = (_props) => {
  const [state, send] = useMachine(stateMachine);
  const [partId, setPartId] = useState(0);
  const {imageSrc, imageDimensions, parts, showPopup} = state.context;
  const imageRef = useRef();

  const onImageSelected = imageSrc => {
    send({ type: 'UPDATE', imageSrc})
  };

  const machinesSend = useCallback(send);
  useEffect(() => {
    const image = _.get(imageRef, 'current', null);
    if (image && imageSrc) {
      const imageDimensions = {
        width: image.clientWidth,
        height: image.clientHeight
      };
      machinesSend({ type: 'UPDATE', imageDimensions})
      machinesSend("POPUP")
    }
  }, [imageSrc, machinesSend]);

  const addPart = shape => {
    parts.push({ shape, id: partId });
    setPartId(partId+1);
    send({ type: 'UPDATE', parts })
  };

  const updateRemovedParts = idToRemove => () => {
    _.remove(parts, ({ id }) => id === idToRemove);
    send({ type: 'UPDATE', parts })
  };

  const renderPart = ({isDraggable, imageDimensions}) => ({ shape, id }) => (
    <ClippedImage
      isDraggable={isDraggable}
      imageSrc={imageRef.current}
      imageDimensions={imageDimensions}
      shape={shape}
      key={isDraggable ? `draggable_${id}` : `hole_${id}`}
      className={isDraggable ? 'draggablePart' : 'partHole'}
      onRemove={updateRemovedParts(id)}
    />
  );

  const closePopup = () => {
    send("POPUP")
  };
  const reset = () => send("RESET");

    
    return (
      <CanvasCutterWrapper>
        {showPopup && (
          <Popup
            className="introPopup"
            popupText={messages.introText}
            closeText={messages.closePopup}
            onClose={closePopup}
          />
        )}
        {imageSrc === null ? (
          <ImageSelector
            className="imageSelector"
            onImageSelected={onImageSelected}
          />
        ) : (
          <ImagesContainer className="ImageContainer">
            <BaseImage
              className="baseImage"
              src={imageSrc}
              ref={imageRef}
              alt=""
            />
            <ImagePartsContainer className="holes">
              {parts.map(renderPart({isDraggable: false, imageDimensions}))}
            </ImagePartsContainer>
            <GUILayer
              className="guiLayer"
              onShapeComplete={addPart}
              dimensions={imageDimensions}
            />
            <ImagePartsContainer className="imageParts">
            {parts.map(renderPart({isDraggable: true, imageDimensions}))}
            </ImagePartsContainer>
            <ResetButton className="resetSceneButton" onClick={reset}>
              {messages.reset}
            </ResetButton>
          </ImagesContainer>
        )}
      </CanvasCutterWrapper>
    );
}
