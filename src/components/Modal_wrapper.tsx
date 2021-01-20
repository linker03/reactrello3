import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  background-color: RGBA(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const wrapper: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <ModalWrapper>{children}</ModalWrapper>
    </React.Fragment>
  );
};

export default wrapper;
