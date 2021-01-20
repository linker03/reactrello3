import React, { Fragment, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CardModal from './Modal';
import ModalWrapper from './Modal_wrapper';
import {
  ICardDenormalized,
  IComment,
  IRootState,
} from '../typescript-stuff/interface';
import { connect } from 'react-redux';
import { deleteCard, editCard, addComment } from '../redux/rootReducer';
import CommentItem from './CommentItem';

const CardWrapper = styled.div`
  padding: 5px;
  margin: 10px 10px;
  /* box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 7px; */
  border: 1px solid gray;
  border-top: 5px solid #7048e8;
  border-bottom: 2px solid gray;
  background-color: white;
  cursor: pointer;
`;

const CardHead = styled.div`
  text-align: center;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  overflow: hidden;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -moz-box-orient: vertical;
  white-space: nowrap;
`;

const CardAuthor = styled.div`
  font-style: italic;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-areas:
    'title close'
    'body body'
    'comment comment'
    'author delete';
  grid-template-rows: 50px 1fr 1fr 50px;
  background-color: aliceblue;
  padding: 20px;
  z-index: 3;
  min-height: 400px;
  min-width: 400px;
  max-width: 50%;
  max-height: 80%;
  overflow: scroll;
  transition-duration: 0.5s;

  textarea {
    background-color: aliceblue;
    border: 0;
    transition-duration: 0.5s;
  }
  textarea:focus {
    background-color: white;
    border: 1px solid purple;
    transition-duration: 0.5s;
  }
  .comments {
  }
`;

const ModalTitle = styled.input`
  margin: 5px 0 20px 15px;
  grid-area: title;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 500;
  height: 40px;
  background-color: inherit;
  border: none;
`;

const ModalBody = styled.textarea`
  grid-area: body;
  margin: 10px 30px 10px 10px;
`;

const ModalAuthor = styled.div`
  font-style: italic;
  grid-area: author;
  align-self: flex-end;
`;

const DeleteButton = styled.div`
  grid-area: delete;
  align-self: flex-end;
  justify-self: flex-end;
  cursor: pointer;
`;

const CloseSymbol = styled.a`
  grid-area: close;
  justify-self: end;
  text-decoration: none;
`;

const Comments = styled.div`
  grid-area: comment;
`;

const CreateComment = styled.div`
  input {
    margin: 5px;
  }
`;

interface ICardItemProps {
  card: ICardDenormalized;
  column: string;
}

type editCardArg = { id: number; title: string; body: string };
type addCommentArg = {
  commentId: number;
  cardId: number;
  text: string;
  author: string;
};

interface IDispathProps {
  deleteCard: (id: number) => void;
  editCard: ({ id, title, body }: editCardArg) => void;
  addComment: ({ commentId, cardId, text, author }: addCommentArg) => void;
}

interface IMapProps {
  author: string;
}

type Props = IMapProps & IDispathProps & ICardItemProps;

const CardItem: React.FC<Props> = ({
  card,
  column,
  deleteCard,
  editCard,
  addComment,
  author,
}) => {
  type cardState = {
    showModal: boolean;
    comment: string;
  };

  type cardEditState = {
    id: number;
    title: string;
    body: string;
  };

  const [state, setState] = useState<cardState>({
    showModal: false,
    comment: '',
  });

  const [cardEdit, setCardEdit] = useState<cardEditState>({
    id: 0,
    title: card.title,
    body: card.body,
  });

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setState((state) => ({ ...state, showModal: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [state.showModal, escFunction]);

  const onClickOpenModal = () => {
    setState((state) => ({ ...state, showModal: true }));
  };

  const comments = card.commentsArray.map((comment: IComment) => (
    <CommentItem key={comment.id} comment={comment} cardId={card.id} />
  ));

  const onClickCloseModal = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('before', card.id, cardEdit.title, cardEdit.body);
    const args = {
      id: card.id,
      title: cardEdit.title,
      body: cardEdit.body,
    };
    editCard(args);
    setState((state) => ({ ...state, showModal: false }));
  };

  const commentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, comment: event.target.value }));
  };

  const endEdit = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCardEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createCommentHandler = () => {
    const args = {
      commentId: Date.now(),
      cardId: card.id,
      text: state.comment,
      author: author,
    };
    addComment(args);
    setState((state) => ({ ...state, comment: '' }));
  };

  return (
    <Fragment>
      <CardWrapper onClick={onClickOpenModal}>
        <CardHead>{card.title}</CardHead>
        <CardBody>{card.body}</CardBody>
        <CardAuthor>Author:{card.author}</CardAuthor>
      </CardWrapper>
      {state.showModal && (
        <CardModal>
          <ModalWrapper>
            <ModalContent key={card.id}>
              <ModalTitle
                name="title"
                spellCheck="false"
                onBlur={endEdit}
                defaultValue={card.title}
              ></ModalTitle>
              <CloseSymbol href="" onClick={onClickCloseModal}>
                X
              </CloseSymbol>
              <ModalBody
                name="body"
                rows={10}
                spellCheck="false"
                onBlur={endEdit}
                defaultValue={card.body}
              ></ModalBody>
              <Comments>
                {comments}
                <CreateComment>
                  Create comment:
                  <input
                    value={state.comment}
                    type="text"
                    onChange={commentInput}
                  />
                  <button type="button" onClick={createCommentHandler}>
                    Create
                  </button>
                </CreateComment>
              </Comments>
              <ModalAuthor>Author: {card.author}</ModalAuthor>
              <DeleteButton
                onClick={() => {
                  deleteCard(card.id);
                }}
              >
                Delete
              </DeleteButton>
            </ModalContent>
          </ModalWrapper>
        </CardModal>
      )}
    </Fragment>
  );
};

const mapDispatchToProps: IDispathProps = {
  deleteCard,
  editCard,
  addComment,
};

const mapStateToProps = (state: any) => ({
  author: state.cards.params.author,
});

export default connect<IMapProps, IDispathProps, ICardItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(CardItem);
