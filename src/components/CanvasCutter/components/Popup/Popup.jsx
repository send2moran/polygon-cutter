import React from 'react';
import { Backdrop, Panel } from './styles';
import { Button } from '../shared/components/Button';

export const Popup = ({ closeText, popupText, onClose }) => (
  <Backdrop className="backdrop">
    <Panel className="panel">
      <p className="popupText">{popupText}</p>
      <Button className="closeButton" onClick={onClose}>
        {closeText}
      </Button>
    </Panel>
  </Backdrop>
);
