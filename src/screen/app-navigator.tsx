import React, {useCallback, useEffect} from 'react';
import AuthStack from '@/routes/auth-stack';
import MyTabs from '@/routes/my-tabs';
import {getToken} from '@/utils/api/token';
import useAccountStore, {IAccountState} from '@/stores/account.store';

const AppNavigator = () => {
  const token = useAccountStore((state: IAccountState) => state.token);
  const setTokenAuth = useAccountStore(
    (state: IAccountState) => state.setTokenAuth,
  );

  const fetchToken = useCallback(async () => {
    try {
      const tokenValue = await getToken();
      setTokenAuth(tokenValue);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, [setTokenAuth]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return token ? <MyTabs /> : <AuthStack />;
};

export default AppNavigator;
