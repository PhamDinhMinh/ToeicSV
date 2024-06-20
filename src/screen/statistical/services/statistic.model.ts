export interface IResponseResultHistory {
  data: string;
  id: number;
  timeStart: any;
  timeEnd: any;
  examId: number | null;
  examName: number | null;
}

export interface IRank {
  rank: number;
  userId: number;
  userName: string;
  avatar: string;
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  accuracyRate: any;
}
