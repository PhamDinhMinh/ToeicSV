import {useMemo} from 'react';
import AuthService from '@/screen/authentication/login/services/login.services';
import {Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const useListSetting = () => {
  const listSetting = useMemo(() => {
    return [
      {
        label: 'Chung',
        data: [
          {
            title: 'Thông tin cá nhân',
            nameIcon: 'person',
            typeIcon: 'ionicon',
            size: 20,
            route: 'InformationScreen',
          },
          {
            title: 'Thay đổi mật khẩu',
            nameIcon: 'shield-half-outline',
            typeIcon: 'ionicon',
            size: 20,
            route: 'ChangePassword',
          },
          {
            title: 'Ngôn ngữ',
            nameIcon: 'earth',
            typeIcon: 'antdesign',
            size: 20,
            key: 'language',
          },
        ],
      },
      {
        label: 'Giao diện',
        data: [
          {
            title: 'Giao diện tối',
            nameIcon: 'moon',
            typeIcon: 'ionicon',
            size: 20,
            route: 'InformationScreen',
          },
          {
            title: 'Giao diện đáp án',
            nameIcon: 'information-circle',
            typeIcon: 'ionicon',
            size: 20,
            route: 'ChangePassword',
          },
        ],
      },
      {
        label: 'Thông tin ứng dụng',
        data: [
          {
            key: 'appVersion',
            title: 'Phiên bản đang dùng',
            nameIcon: 'smartphone',
            typeIcon: 'material',
            function: () => {
              let versionApp = DeviceInfo.getVersion();
              Alert.alert(`Phiên bản bạn đang dử dụng là ${versionApp}`);
            },
          },
        ],
      },
      {
        label: 'Tài khoản',
        data: [
          {
            title: 'Chia sẻ cho bạn bè',
            nameIcon: 'share',
            typeIcon: 'entypo',
            size: 20,
            route: 'InformationScreen',
          },
          {
            title: 'Xoá tài khoản',
            nameIcon: 'trash',
            typeIcon: 'ionicon',
            size: 20,
            route: 'InformationScreen',
          },
          {
            key: 'logout',
            title: 'Đăng xuất',
            nameIcon: 'power-off',
            typeIcon: 'font-awesome',
            size: 20,
            function: () => {
              // Alert.alert()
              AuthService.logout();
            },
          },
        ],
      },
    ];
  }, []);

  return listSetting;
};

export default useListSetting;
