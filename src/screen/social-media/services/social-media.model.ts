export interface IPostResponse {
  id: number;
  contentPost: string;
  state: number;
  imageUrls: string[];
  emotionId: null | number;
  backGroundId: number;
  sharedPostId: number;
  countComment: number;
  countReact: number;
  reactStates: any[];
  userReact: null | number;
  user: {
    id: number;
    name: string;
    coverImageUrl: string;
    imageUrl: string;
    creationTime: any;
  };
  creationTime: any;
}

export interface ICommentResponse {
  id: number;
  comment: string;
  parentCommentId: number | null;
  creatorUserId: number;
  postId: number;
  creationTime: any | null;
  user: {
    id: number;
    name: string;
    coverImageUrl: string;
    imageUrl: string;
  };
  countChildComment: number;
  countReact: number;
  userReact: number | null;
}

export interface IReactResponse {
  id: number;
  postId: number;
  creatorUserId: number;
  creationTime: any;
  reactState: number;
  commentId: number | null;
  user: {
    id: number;
    name: string;
    coverImageUrl: string;
    imageUrl: string;
    creationTime: any;
  };
}

export interface IInputReact {
  reactState?: number | null;
  commentId?: number;
  postId?: number;
  isCancel?: boolean;
  creatorUserId: number;
}
