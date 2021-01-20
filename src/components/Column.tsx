import React, { useState } from 'react';
import styled from 'styled-components';
import { ICardDenormalized } from '../typescript-stuff/interface';
import CardItem from './CardItem';
import Modal from './Modal';
import ModalWrapper from './Modal_wrapper';
import CardCreateForm from './CardCreateForm';

const ColumnWrapper = styled.div`
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: #ececec;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const ColumnTitle = styled.input`
  display: flex;
  background-color: #7048e8;
  font-size: 18px;
  font-weight: 700;
  color: aliceblue;
  padding: 10px;
  text-align: center;
  width: 100%;
  border: 0;
  text-transform: uppercase;
`;

const AddCard = styled.div`
  text-align: center;
  margin: 10px;
  border-radius: 5px;
  line-height: 2rem;
  text-transform: uppercase;
  transition-duration: 0.5s;

  &:hover {
    background-color: #d0bfff;
    transition-duration: 0.5s;
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  background-color: aliceblue;
  padding: 20px;
  z-index: 3;
  min-height: 400px;
  min-width: 400px;
  max-width: 50%;
  form {
    display: flex;
    flex-direction: column;
  }
  .window-title {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1rem;
  }
  .card__title {
    margin: 10px 5px 5px 10px;
  }
  .card__title > input {
    margin: 10px;
    width: 50%;
  }
  .card__body {
    margin: 10px 5px 5px 10px;
    display: flex;
  }
  .card__body > textarea {
    margin-left: 10px;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
`;

export interface IColumnProps {
  author: string;
  title: string;
  data: ICardDenormalized[];
}

const Column: React.FC<IColumnProps> = ({ author, title, data }) => {
  type ColumnState = {
    showCreateModal: boolean;
  };

  const [state, setModal] = useState<ColumnState>({ showCreateModal: false });

  function closeModal() {
    setModal({ showCreateModal: false });
  }

  return (
    <ColumnWrapper>
      <ColumnTitle spellCheck="false" defaultValue={title}></ColumnTitle>
      {data.map((card: ICardDenormalized) => {
        return <CardItem key={card.id} column={title} card={card}></CardItem>;
      })}
      <AddCard
        onClick={() => {
          setModal({ showCreateModal: true });
        }}
      >
        Add card
      </AddCard>
      {state.showCreateModal && (
        <Modal>
          <ModalWrapper>
            <ModalContent>
              <CardCreateForm
                column={title}
                author={author}
                close={closeModal}
              />
            </ModalContent>
          </ModalWrapper>
        </Modal>
      )}
    </ColumnWrapper>
  );
};

export default Column;
