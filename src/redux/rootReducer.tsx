import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { ICard, ICommentStorage, IParams } from '../typescript-stuff/interface';

interface IInitialState {
  cards: ICard[];
  params: IParams;
}

const cardInitialState: IInitialState = {
  cards: [
    {
      id: 0,
      title: 'card1',
      column: 'todo',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      author: 'ME',
      commentsArray: [0, 1],
    },
    {
      id: 1,
      title: 'card2',
      column: 'todo',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      author: 'ME',
      commentsArray: [2, 3],
    },
    {
      id: 2,
      title: 'card3',
      column: 'todo',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      author: 'ME',
      commentsArray: [4],
    },
  ],
  params: {
    author: 'ME',
  },
};

const commentsInitialState: ICommentStorage = {
  0: { id: 0, author: 'ME', text: 'hello, this is comment' },
  1: { id: 1, author: 'ME', text: 'hello, this is second comment' },
  2: { id: 2, author: 'ME', text: 'hello, this is third comment' },
  3: { id: 3, author: 'ME', text: 'hello, this is fourth comment' },
  4: { id: 4, author: 'ME', text: 'hello, this is fifth comment' },
  allIds: [0, 1, 2, 3, 4],
};

const cardReducer = createSlice({
  name: 'cardReducer',
  initialState: cardInitialState,
  reducers: {
    addCard(state, action) {
      state.cards.push(action.payload);
    },
    editCard(state, action) {
      console.log(state, action);
      state.cards = state.cards.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            title: action.payload.title,
            body: action.payload.body,
          };
        }
        return item;
      });
    },
    deleteCard(state, action) {
      return {
        ...state,
        cards: state.cards.filter((item) => item.id !== action.payload),
      };
    },
    addComment(state, action) {
      console.log('im in cards');

      const newCards = state.cards.map((item) => {
        if (item.id === action.payload.cardId) {
          return {
            ...item,
            commentsArray: item.commentsArray.concat([
              action.payload.commentId,
            ]),
          };
        }
        return item;
      });
      return {
        ...state,
        cards: newCards,
      };
    },

    deleteComment(state, action) {
      return {
        ...state,
        cards: state.cards.map((item) => {
          if (item.id === action.payload.cardId) {
            return {
              ...item,
              commentsArray: item.commentsArray.filter(
                (item) => item !== action.payload.commentId
              ),
            };
          }
          return item;
        }),
      };
    },
    addAuthor(state, action) {
      state.params.author = action.payload;
    },
  },
});

const commentReducer = createSlice({
  name: 'commentReducer',
  initialState: commentsInitialState,
  reducers: {
    editComment(state, action) {
      state[action.payload.commentId].text = action.payload.commentText;
    },
  },
  extraReducers: {
    [cardReducer.actions.addComment.type](state, action) {
      console.log('Im in comments', state, action);
      let newComment = {
        id: action.payload.commentId,
        author: action.payload.author,
        text: action.payload.text,
      };
      return { ...state, [action.payload.commentId]: newComment };
    },
  },
});

const rootReducer = combineReducers({
  cards: cardReducer.reducer,
  comments: commentReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const {
  addCard,
  editCard,
  deleteCard,
  addComment,

  deleteComment,
  addAuthor,
} = cardReducer.actions;

export const { editComment } = commentReducer.actions;
