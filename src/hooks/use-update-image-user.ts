import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import settingService from '@/screen/setting/services/setting.services';
import useAccountStore from '@/stores/account.store';
import {useMutation} from '@tanstack/react-query';

const useUpdateUserInfo = () => {
  const language = useTranslation();
  const account = useAccountStore(state => state?.account);
  const setAccount = useAccountStore(state => state.setAccount);

  const {mutate: updateAvatar} = useMutation({
    mutationFn: (avatar: string) =>
      settingService.updateAvatarUser({imageUrl: avatar}),
    onSuccess: (_, avatar) => {
      if (account) {
        setAccount({
          ...account,
          imageUrl: avatar,
        });
      }
      Toast.show({
        type: 'success',
        text1: language.t('edit-success'),
        topOffset: 80,
        visibilityTime: 500,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
  });

  const {mutate: updateCoverAvatar} = useMutation({
    mutationFn: (coverAvatar: string) =>
      settingService.updateCoverAvatarUser({coverImageUrl: coverAvatar}),
    onSuccess: (_, coverAvatar) => {
      if (account) {
        setAccount({
          ...account,
          coverImageUrl: coverAvatar,
        });
      }
      Toast.show({
        type: 'success',
        text1: language.t('edit-success'),
        topOffset: 80,
        visibilityTime: 500,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
  });

  return {updateAvatar, updateCoverAvatar};
};

export default useUpdateUserInfo;
