import axiosClient from '@/utils/api/axios';

class SettingService {
  PATH_USER = 'api/services/app/User';

  async updateUser(params: any) {
    const url = this.PATH_USER + '/Update';
    return axiosClient.put(url, params);
  }

  changePassword = async (params: any): Promise<any> => {
    const url = this.PATH_USER + '/ChangePassword';
    return axiosClient.post(url, params);
  };
}

const settingService = new SettingService();
export default settingService;
