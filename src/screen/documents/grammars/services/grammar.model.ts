export interface IGrammarResponse {
  id: number;
  title: string;
  content: string;
  isWatched: boolean;
  type: number;
  creatorId: number;
  creationTime: any;
}

export enum ETypeGrammar {
  Basic = 1,
  Advanced = 2,
}
