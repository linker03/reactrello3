import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ICard } from '../typescript-stuff/interface';
import { addCard } from '../redux/rootReducer';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  .buttons {
  }
`;

const WindowTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.div`
  margin: 10px 5px 5px 10px;
`;

const CardTitleInput = styled.input`
  margin: 10px;
  width: 50%;
`;

const CardBody = styled.div`
  margin: 10px 5px 5px 10px;
  display: flex;
`;

const CardBodyTextarea = styled.textarea`
  margin-left: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export interface ICardCreateFormProps {
  column: string;
  author: string;
  close: () => void;
}

type Props = ICardCreateFormProps & IDispatchProps;

interface IDispatchProps {
  addCard: (newCard: ICard) => void;
}

const CardCreateForm: React.FC<Props> = ({
  column,
  author,
  close,
  addCard,
}) => {
  type CreateCardFormState = {
    column: string;
    title: string;
    body: string;
    author: string;
  };

  const [state, setState] = React.useState<CreateCardFormState>({
    column: column,
    title: '',
    body: '',
    author: author,
  });

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    let newCard: ICard = {
      id: Date.now(),
      title: state.title,
      column: state.column,
      body: state.body,
      author,
      commentsArray: [],
    };
    console.log(newCard);
    addCard(newCard);
    close();
  }

  return (
    <Form onSubmit={submitHandler}>
      <WindowTitle>Create new card</WindowTitle>
      <CardTitle>
        Card's title:
        <CardTitleInput type="text" name="title" onChange={onChangeHandler} />
      </CardTitle>
      <CardBody>
        Card's text:
        <CardBodyTextarea
          name="body"
          id=""
          cols={30}
          rows={10}
          onChange={onChangeHandler}
        ></CardBodyTextarea>
      </CardBody>
      <Buttons>
        <button type="submit">Create</button>
        <button onClick={close}>Cancel</button>
      </Buttons>
    </Form>
  );
};

const mapDispatchToProps: any = {
  addCard,
};

export default connect<null, IDispatchProps, ICardCreateFormProps>(
  null,
  mapDispatchToProps
)(CardCreateForm);
