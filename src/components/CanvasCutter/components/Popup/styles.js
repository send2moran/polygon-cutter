import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Panel = styled.div`
  background-color: white;
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  filter: drop-shadow(0 5px 10px #000);
  text-align: center;
`;
