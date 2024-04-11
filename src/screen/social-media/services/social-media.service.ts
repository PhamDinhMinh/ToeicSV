import axiosClient from '@/utils/api/axios';
import {IPostResponse} from './social-media.model';

class SocialMediaService {
  PATH_POST = '/api/services/app/Post';

  getAll = async (
    params: any,
  ): Promise<{
    data: IPostResponse[];
    totalRecords: number;
  }> => {
    const url = this.PATH_POST + '/GetAll';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };
}

const socialMediaService = new SocialMediaService();
export default socialMediaService;
