import React from 'react';
import AuthStack from '@/routes/auth-stack';
import MainStack from '@/routes/main-stack';
import MyTabs from '@/routes/my-tabs';

const AppNavigator = () => {
  const token = false;
  const userInformation = 123;

  return !token || !userInformation ? <AuthStack /> : <MyTabs />;
};

export default AppNavigator;
