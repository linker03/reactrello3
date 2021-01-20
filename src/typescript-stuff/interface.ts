export interface ICard {
  id: number;
  title: string;
  column: string;
  body: string;
  author: string;
  commentsArray: number[];
}

export interface IComment {
  id: number;
  author: string;
  text: string;
}

export interface ICommentStorage {
  [key: number]: IComment;
  allIds: number[];
}

export interface IParams {
  author: string;
}

export interface ICardDenormalized {
  id: number;
  title: string;
  column: string;
  body: string;
  author: string;
  commentsArray: IComment[];
}

export interface IRootState {
  cards: ICard[];
  comments: ICommentStorage;
  params: IParams;
}
