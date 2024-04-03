import axiosClient from '@/utils/api/axios';
import {IGrammarResponse} from './grammar.model';

class GrammarService {
  endpoint = '/api/services/app/Grammar';

  async getAll(params: any): Promise<{
    data: IGrammarResponse[];
    totalRecords: number;
  }> {
    const url = this.endpoint + '/GetAll';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  }

  async updateWatch(params: any) {
    const url = this.endpoint + '/UpdateWatch';
    return axiosClient.put(url, params);
  }
}

const grammarService = new GrammarService();
export default grammarService;
