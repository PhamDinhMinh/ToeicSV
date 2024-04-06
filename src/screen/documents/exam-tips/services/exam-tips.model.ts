export interface IParamsGet {
  type?: number;
  keyword?: string;
  skipCount: number;
  maxResultCount: number;
}

export interface IExamTipsResponse {
  id: number;
  title: string;
  description: string[];
  isWatched: boolean;
  type: number;
  creatorId: number;
  creationTime: any;
}

export interface ICreateInput {
  title: string;
  description: string[];
  type: number;
  creatorId: number;
}

export enum EExamTipsType {
  Part1 = 1,
  Part2 = 2,
  Part3 = 3,
  Part4 = 4,
  Part5 = 5,
  Part6 = 6,
  Part7 = 7,
}
