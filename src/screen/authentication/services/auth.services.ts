import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IUser,
} from './auth.modal';
import {removeToken} from '@/utils/api/token';
import axiosClient from '@/utils/api/axios';

class Auth {
  endpoint = '/api/services/app/Authentication';

  login = async (data: ILoginPayload): Promise<ILoginResponse> => {
    const url = this.endpoint + '/Login';
    const response = await axiosClient.post(url, data);
    return response.data;
  };

  async getUserInfo(): Promise<IUser> {
    const url = this.endpoint + '/GetUserInfo';
    const response = await axiosClient.get(url);

    return response.data;
  }

  register = async (data: IRegisterPayload): Promise<any> => {
    const url = this.endpoint + '/Register';
    const response = await axiosClient.post(url, data);
    return response.data;
  };

  async logout(): Promise<void> {
    await removeToken();
  }
}

const authService = new Auth();
export default authService;
