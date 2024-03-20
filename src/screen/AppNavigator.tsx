import React from 'react';
import AuthStack from '@/routes/AuthStack';
import MainStack from '@/routes/MainStack';
import MyTabs from '@/routes/MyTabs';

const AppNavigator = () => {
  const token = false;
  const userInformation = 123;

  return !token || !userInformation ? <AuthStack /> : <MyTabs />;
};

export default AppNavigator;
