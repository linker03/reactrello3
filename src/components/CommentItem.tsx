import React, { useState } from 'react';
import styled from 'styled-components';
import { IComment } from '../typescript-stuff/interface';
import { editComment, deleteComment } from '../redux/rootReducer';
import { connect } from 'react-redux';

const CommentWrapper = styled.div`
  display: grid;
  background-color: #fefdca;
  margin: 10px;
  padding: 10px;
  box-shadow: 3px 3px 2px 2px #ccc;
  .comment__author {
    justify-self: flex-end;
  }
  .comment__body {
    border: 0;
    background-color: #fefdca;
  }
  .delete__button {
    cursor: pointer;
  }
`;

type editCommentArgs = { commentId: number; commentText: string };
type deleteCommentArgs = { cardId: number; commentId: number };

interface IDispatchProps {
  editComment: ({ commentId, commentText }: editCommentArgs) => void;
  deleteComment: ({ cardId, commentId }: deleteCommentArgs) => void;
}

interface ICommentItemProps {
  comment: IComment;
  cardId: number;
}

type Props = IDispatchProps & ICommentItemProps;

const CommentItem: React.FC<Props> = ({
  comment,
  cardId,
  editComment,
  deleteComment,
}) => {
  const [state, setState] = useState({
    comment: comment.text,
  });

  const endEdit = () => {
    const args = { commentId: comment.id, commentText: state.comment };
    editComment(args);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <CommentWrapper key={comment.id}>
      <textarea
        rows={2}
        spellCheck="false"
        className="comment__body"
        name="comment"
        value={state.comment}
        onChange={onChangeHandler}
        onBlur={endEdit}
      ></textarea>
      <div className="comment__author">{comment.author}</div>
      <div
        className="delete__button"
        onClick={() => {
          deleteComment({ cardId: cardId, commentId: comment.id });
        }}
      >
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </div>
    </CommentWrapper>
  );
};

const mapDispatchToProps: IDispatchProps = {
  editComment,
  deleteComment,
};

export default connect<null, IDispatchProps, ICommentItemProps>(
  null,
  mapDispatchToProps
)(CommentItem);
