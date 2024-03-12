import React from 'react';
import AuthStack from '@/routes/AuthStack';
import MainStack from '@/routes/MainStack';

const AppNavigator = () => {
  const token = false;
  const userInformation = 123;

  return !token || !userInformation ? <AuthStack /> : <MainStack />;
};

export default AppNavigator;
