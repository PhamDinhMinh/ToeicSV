export interface IPostResponse {
  id: number;
  contentPost: string;
  state: number;
  imageUrls: string[];
  emotionId: null | number;
  backGroundId: null | number;
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
