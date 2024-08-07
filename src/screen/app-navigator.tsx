import React, {useCallback, useEffect} from 'react';
import AuthStack from '@/routes/auth-stack';
// import MyTabs from '@/routes/my-tabs';
import {getToken} from '@/utils/api/token';
import useAccountStore, {IAccountState} from '@/stores/account.store';
import {useMutation} from '@tanstack/react-query';
import authService from './authentication/services/auth.services';
import Toast from 'react-native-toast-message';
import {IUser} from './authentication/services/auth.modal';
import MainStack from '@/routes/main-stack';

const AppNavigator = () => {
  const token = useAccountStore((state: IAccountState) => state.token);
  const setTokenAuth = useAccountStore(
    (state: IAccountState) => state.setTokenAuth,
  );

  const setAccount = useAccountStore(
    (state: IAccountState) => state.setAccount,
  );

  const {mutate: getInformation} = useMutation({
    mutationFn: () => authService.getUserInfo(),
    onError: (err: any) => {
      authService.logout();
      setTokenAuth(null);
      return Toast.show({
        type: 'error',
        text1: err?.data,
        topOffset: 80,
      });
    },
    onSuccess: (data: IUser) => {
      setAccount(data);
    },
  });

  const fetchToken = useCallback(async () => {
    try {
      const tokenValue = await getToken();
      setTokenAuth(tokenValue);
      if (tokenValue) {
        getInformation();
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, [getInformation, setTokenAuth]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return token ? <MainStack /> : <AuthStack />;
};

export default AppNavigator;
