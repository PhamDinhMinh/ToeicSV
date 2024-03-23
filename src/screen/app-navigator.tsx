import React from 'react';
import AuthStack from '@/routes/auth-stack';
import MyTabs from '@/routes/my-tabs';
import {getToken} from '@/utils/api/token';
import useAccountStore, {IAccountState} from '@/stores/account.store';

const AppNavigator = () => {
  const token = getToken();
  const userInformation = useAccountStore(
    (state: IAccountState) => state.account,
  );

  return !token || !userInformation ? <AuthStack /> : <MyTabs />;
};

export default AppNavigator;
