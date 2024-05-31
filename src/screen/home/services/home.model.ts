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

export interface IResponseQuestionGroup {
  id: number;
  audioUrl: string;
  imageUrl: string[];
  content: null | string;
  partId: number;
  transcription: string;
  questions: {
    id: number;
    content: string;
    numberSTT: number;
    type: number[];
    transcription: string;
    answers: IAnswers[];
  }[];
}

export interface ISubmitQuestionInput {
  resultOfUser: {
    idQuestion: number;
    idAnswer: number;
  }[];
  timeStart?: any;
  timeEnd?: any;
  idExam?: number;
}
