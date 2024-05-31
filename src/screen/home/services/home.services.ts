import axiosClient from '@/utils/api/axios';
import {
  IResponseQuestion,
  IResponseQuestionGroup,
  ISubmitQuestionInput,
} from './home.model';

class HomeService {
  QUESTION = 'api/services/app/Question';
  RESULT = '/api/services/app/Result';

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

  submitQuestion = async (params: ISubmitQuestionInput) => {
    const url = this.RESULT + '/SubmitQuestion';
    const {data: response} = await axiosClient.post(url, params);
    return response;
  };
}

const homeService = new HomeService();
export default homeService;
