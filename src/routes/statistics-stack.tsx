import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

export type TStatisticsStackParamList = {};

const Stack = createStackNavigator<TStatisticsStackParamList>();

const StatisticsStack = () => {
  const language = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}></Stack.Navigator>
  );
};

export default StatisticsStack;
