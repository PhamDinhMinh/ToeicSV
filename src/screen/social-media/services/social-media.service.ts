import axiosClient from '@/utils/api/axios';
import {
  ICommentResponse,
  IPostResponse,
  IReactResponse,
} from './social-media.model';

class SocialMediaService {
  PATH_POST = '/api/services/app/Post';
  PATH_COMMENT = '/api/services/app/PostComment';
  PATH_REACT = '/api/services/app/PostReact';

  getAllPost = async (
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

  deletePost = async (params: any) => {
    const url = this.PATH_POST + '/Delete';
    return axiosClient.delete(url, {params: params});
  };

  getAllComment = async (
    params: any,
  ): Promise<{
    data: ICommentResponse[];
    totalRecords: number;
  }> => {
    const url = this.PATH_COMMENT + '/GetAll';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };

  createComment = async (params: any): Promise<any> => {
    const url = this.PATH_COMMENT + '/Create';
    return axiosClient.post(url, params);
  };

  deleteComment = async (params: any) => {
    const url = this.PATH_COMMENT + '/Delete';
    const {data: response} = await axiosClient.delete(url, {params: params});
    return response;
  };

  getAllReact = async (
    params: any,
  ): Promise<{
    data: IReactResponse[];
    totalRecords: number;
  }> => {
    const url = this.PATH_REACT + '/GetAllReact';
    const {data: response} = await axiosClient.get(url, {params: params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };
}

const socialMediaService = new SocialMediaService();
export default socialMediaService;
