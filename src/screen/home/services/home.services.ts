import axiosClient from '@/utils/api/axios';
import {IResponseQuestion} from './home.model';

class HomeService {
  QUESTION = 'api/services/app/Question';

  getQuestionUser = async (
    params: any,
  ): Promise<{
    data: IResponseQuestion[];
    totalRecords: number;
  }> => {
    const url = this.QUESTION + '/GetQuestionUser';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };
}

const homeService = new HomeService();
export default homeService;