export interface IResponseQuestion {
  id: number;
  content: null | string;
  partId: number;
  imageUrl: string[];
  audioUrl: null | string;
  numberSTT: number;
  type: number[];
  idGroupQuestion: number | null;
  transcription: null | string;
  answers: IAnswers[];
}

export interface IAnswers {
  id: number;
  content: string;
  isBoolean: boolean;
  transcription: null | string;
}
