import React, { useState } from 'react';
import { connect } from 'react-redux';
import Board from './components/Board';
import Column from './components/Column';
import Modal from './components/Modal';
import ModalWrapper from './components/Modal_wrapper';
import { addAuthor } from './redux/rootReducer';
import {
  ICard,
  ICardDenormalized,
  ICommentStorage,
  IParams,
  IRootState,
} from './typescript-stuff/interface';

interface IMapProps {
  cards: ICard[];
  comments: ICommentStorage;
  params: IParams;
}

interface IDispatchProps {
  addAuthor: (author: string) => void;
}

type Props = IDispatchProps & IMapProps;

const App: React.FC<Props> = ({ cards, comments, params, addAuthor }) => {
  interface IAuthor {
    onStart: boolean;
    author: string;
  }

  const [author, setAuthor] = useState<IAuthor>({
    onStart: true,
    author: '',
  });
  function deNormalize(array: ICard[]) {
    return array.map((card: ICard) => {
      return {
        ...card,
        commentsArray: card.commentsArray.map((key: number) => comments[key]),
      };
    });
  }

  const todos: ICardDenormalized[] = deNormalize(
    cards.filter((card: ICard) => card.column === 'todo')
  );
  const inProgress: ICardDenormalized[] = deNormalize(
    cards.filter((card: ICard) => card.column === 'in_progress')
  );
  const testing: ICardDenormalized[] = deNormalize(
    cards.filter((card: ICard) => card.column === 'testing')
  );
  const done: ICardDenormalized[] = deNormalize(
    cards.filter((card: ICard) => card.column === 'done')
  );

  return (
    <>
      <Board>
        <Column author={params.author} title="todo" data={todos}></Column>
        <Column
          author={params.author}
          title="in_progress"
          data={inProgress}
        ></Column>
        <Column author={params.author} title="testing" data={testing}></Column>
        <Column author={params.author} title="done" data={done}></Column>
      </Board>
      {author.onStart && (
        <Modal>
          <ModalWrapper>
            <div className="container">
              <div>Enter your name</div>
              <input
                placeholder="Enter name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAuthor((state) => ({
                    ...state,
                    author: event.target.value,
                  }));
                }}
              ></input>
              <button
                type="button"
                onClick={() => {
                  addAuthor(author.author);
                  setAuthor((state) => ({ ...state, onStart: false }));
                }}
              >
                Ok
              </button>
            </div>
          </ModalWrapper>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cards: state.cards.cards,
    params: state.cards.params,
    comments: state.comments,
  };
};

const mapDispatchToProps: IDispatchProps = {
  addAuthor,
};

export default connect<IMapProps, IDispatchProps, null>(
  mapStateToProps,
  mapDispatchToProps
)(App);
