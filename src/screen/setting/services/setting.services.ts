import axiosClient from '@/utils/api/axios';

class SettingService {
  PATH_USER = 'api/services/app/User';

  changePassword = async (params: any): Promise<any> => {
    const url = this.PATH_USER + '/ChangePassword';
    return axiosClient.post(url, params);
  };
}

const settingService = new SettingService();
export default settingService;
