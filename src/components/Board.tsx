import React from 'react';
import styled from 'styled-components';

const BoardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 300px));
  grid-gap: 30px;
`;
const BoardWrapper = styled.div`
  margin: 50px 200px;
`;

const Board: React.FC = ({ children }) => {
  return (
    <BoardWrapper>
      <BoardContent>{children}</BoardContent>
    </BoardWrapper>
  );
};

export default Board;
