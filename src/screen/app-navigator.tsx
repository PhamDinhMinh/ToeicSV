import React, {useCallback, useEffect} from 'react';
import AuthStack from '@/routes/auth-stack';
// import MyTabs from '@/routes/my-tabs';
import {getToken} from '@/utils/api/token';
import useAccountStore, {IAccountState} from '@/stores/account.store';
import {useMutation} from '@tanstack/react-query';
import AuthService from './authentication/login/services/login.services';
import Toast from 'react-native-toast-message';
import {IUser} from './authentication/login/services/login.modal';
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
    mutationFn: () => AuthService.getUserInfo(),
    onError: (err: any) => {
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
