import axiosClient from '@/utils/api/axios';
import {
  ICommentResponse,
  IInformationUser,
  IInputReact,
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

  getAllPostUser = async (params: {
    userId: number;
    skipCount?: number;
    maxResultCount?: number;
  }): Promise<{
    data: IPostResponse[];
    totalRecords: number;
  }> => {
    const url = this.PATH_POST + '/GetListPostUser';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
      totalRecords: response.totalRecords,
    };
  };

  getPostById = async (params: {
    id: number;
  }): Promise<{
    data: IPostResponse;
  }> => {
    const url = this.PATH_POST + '/GetPostById';
    const {data: response} = await axiosClient.get(url, {params});
    return {
      data: response.data,
    };
  };

  createPost = async (params: any): Promise<any> => {
    const url = this.PATH_POST + '/Create';
    return axiosClient.post(url, params);
  };

  updatePost = (params: any) => {
    const url = this.PATH_POST + '/Update';
    return axiosClient.put(url, params);
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

  createOrUpdateReact = async (params: IInputReact) => {
    const url = this.PATH_REACT + '/CreateOrUpdate';
    return axiosClient.post(url, params);
  };

  getUserInformation = async (params: {
    id: number;
  }): Promise<{data: IInformationUser; totalPosts: number}> => {
    const url = this.PATH_POST + '/GetUserWallPost';
    const {data: result} = await axiosClient.get(url, {params: params});
    return {
      totalPosts: result?.data.totalPosts,
      data: result?.data?.user,
    };
  };
}

const socialMediaService = new SocialMediaService();
export default socialMediaService;
