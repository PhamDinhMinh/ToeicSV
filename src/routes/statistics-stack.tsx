import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryAllScreen from '@/screen/statistical/screens/history-all.screen';
import RankScreen from '@/screen/statistical/screens/rank.screen';

export type TStatisticsStackParamList = {
  HistoryAllScreen: undefined;
  RankScreen: undefined;
};

const Stack = createStackNavigator<TStatisticsStackParamList>();

const StatisticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HistoryAllScreen"
        component={HistoryAllScreen}
        options={{
          headerShown: true,
          title: 'Lịch sử đã làm',
        }}
      />
      <Stack.Screen
        name="RankScreen"
        component={RankScreen}
        options={{
          headerShown: true,
          title: 'Xếp hạng thành viên',
        }}
      />
    </Stack.Navigator>
  );
};

export default StatisticsStack;
