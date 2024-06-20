import axiosClient from '@/utils/api/axios';
import {IRank, IResponseResultHistory} from './statistic.model';

class StatisticService {
  RESULT = '/api/services/app/Result';
  STATISTIC = '/api/services/app/Statistics';

  getHistoryForUser = async (
    params: any,
  ): Promise<{
    data: IResponseResultHistory[];
    totalRecords: number;
  }> => {
    const url = this.RESULT + '/HistoryForUser';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };

  getRank = async (
    params: any,
  ): Promise<{
    data: IRank[];
    totalRecords: number;
  }> => {
    const url = this.STATISTIC + '/StatisticsOrdinal';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };
}

const statisticService = new StatisticService();
export default statisticService;
