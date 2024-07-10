import {useMemo} from 'react';
import authService from '@/screen/authentication/services/auth.services';
import {Alert, Share} from 'react-native';
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
            route: 'ChangePasswordScreen',
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
            function: () => {
              Alert.alert('Chưa có giao diện. Hãy quay lại sau');
            },
          },
          {
            title: 'Giao diện đáp án',
            nameIcon: 'information-circle',
            typeIcon: 'ionicon',
            size: 20,
            function: () => {
              Alert.alert('Chưa có giao diện. Hãy quay lại sau');
            },
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
            function: async () => {
              try {
                const result = await Share.share({
                  title: 'App link',
                  message:
                    'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                Alert.alert('Có lỗi xảy ra, vui lòng thử lại');
              }
            },
          },
          {
            title: 'Xoá tài khoản',
            nameIcon: 'trash',
            typeIcon: 'ionicon',
            function: () => {
              Alert.alert(
                'Tính năng xoá tài khoản đang được hoàn thiện. Hãy quay lại sau',
              );
            },
            size: 20,
          },
          {
            key: 'logout',
            title: 'Đăng xuất',
            nameIcon: 'power-off',
            typeIcon: 'font-awesome',
            size: 20,
            function: () => {
              // Alert.alert()
              authService.logout();
            },
          },
        ],
      },
    ];
  }, []);

  return listSetting;
};

export default useListSetting;
