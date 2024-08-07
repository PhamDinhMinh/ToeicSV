import axiosClient from '@/utils/api/axios';
import {
  IQuestionById,
  IResponseExamAll,
  IResponseExamDetail,
  IResponseQuestion,
  IResponseQuestionGroup,
  IResponseSubmit,
  IResultById,
  ISubmitQuestionInput,
} from './home.model';

class HomeService {
  QUESTION = 'api/services/app/Question';
  RESULT = '/api/services/app/Result';
  EXAM_TOEIC = '/api/services/app/ExamToeic';

  getQuestionUser = async (
    params: any,
  ): Promise<{
    data: IResponseQuestion[] | IResponseQuestionGroup[];
    totalRecords: number;
  }> => {
    const url = this.QUESTION + '/GetQuestionUser';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };

  submitQuestion = async (
    params: ISubmitQuestionInput,
  ): Promise<IResponseSubmit> => {
    const url = this.RESULT + '/SubmitQuestion';
    const {data: response} = await axiosClient.post(url, params);
    return response;
  };

  getAllExam = async (
    params: any,
  ): Promise<{
    data: IResponseExamAll[];
    totalRecords: number;
  }> => {
    const url = this.EXAM_TOEIC + '/GetAll';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };

  getExamDetail = async (params: {
    id: number;
  }): Promise<{
    data: IResponseExamDetail;
  }> => {
    const url = this.EXAM_TOEIC + '/GetByIdForUser';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
    };
  };

  getResultById = async (params: {
    id: number | undefined;
  }): Promise<IResultById> => {
    const url = this.RESULT + '/GetById';
    const {data: response} = await axiosClient.get(url, {params});
    return response.data;
  };

  getQuestionById = async (params: {id: number}): Promise<IQuestionById> => {
    const url = this.QUESTION + '/GetQuestionById';
    const {data: response} = await axiosClient.get(url, {params});
    return response.data;
  };
}

const homeService = new HomeService();
export default homeService;
