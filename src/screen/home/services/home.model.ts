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

export interface IResponseExamAll {
  id: number;
  nameExam: string;
  listQuestionPart1: number[];
  listQuestionPart2: number[];
  listQuestionPart3: number[];
  listQuestionPart4: number[];
  listQuestionPart5: number[];
  listQuestionPart6: number[];
  listQuestionPart7: number[];
}

export interface IResponseExamDetail {
  id: number;
  nameExam: string;
  creationTime: string;
  questionsOnExam: (IResponseQuestion | IResponseQuestionGroup)[];
}

export interface IResponseSubmit {
  details: string;
  listeningCorrect: number;
  readingCorrect: number;
  totalCorrect: number;
  totalWrong: number;
}

export interface IResultById {
  data: string;
  id: number;
  timeStart: any;
  timeEnd: any;
  examName: null | string;
}

export interface IItemResult {
  Id: number;
  Content: string;
  PartId: number;
  ImageUrl: string[];
  AudioUrl: null | string;
  Transcription: string;
  NumberSTT: number;
  Type: number[];
  IdGroupQuestion: null | number;
  CreationTime: any;
  Group: any;
  Answer: {
    Id: number;
    Content: string;
    IsBoolean: boolean;
    Transcription: any;
  };
  AnswersQuestion: {
    Id: number;
    IsBoolean: boolean;
  }[];
}

export interface IQuestionById {
  content: string;
  id: number;
  transcription: string | null;
  imageUrl: string[];
  type: number[];
  audioUrl: null | string;
  partId: number;
  groupData: {
    transcription: string;
    partId: number;
    audioUrl: string | null;
    content: null | string;
    imageUrl: string[];
    id: number;
  };
  answers: IAnswers[];
}
