import axiosClient from '@/utils/api/axios';
import {IExamTipsResponse} from './exam-tips.model';

class ExamTipsService {
  endpoint = '/api/services/app/ExamTips';

  async getAll(params: any): Promise<{
    data: IExamTipsResponse[];
    totalRecords: number;
  }> {
    const url = this.endpoint + '/GetAll';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  }
}

const examTipsService = new ExamTipsService();
export default examTipsService;
