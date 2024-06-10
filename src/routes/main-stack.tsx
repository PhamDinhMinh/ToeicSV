import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import MyTabs, {TMyTabsParamsList} from './my-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import DocumentsStack, {TDocumentStackParamList} from './documents-stack';
import SocialMediaStack, {
  TSocialMediaStackParamList,
} from './social-media-stack';
import SettingStack, {TSettingStackParamList} from './setting-stack';
import HomeStack, {THomeStackParamList} from './home-stack';
import StatisticsStack, {TStatisticsStackParamList} from './statistics-stack';

export type TMainStackParamList = {
  MyTab: NavigatorScreenParams<TMyTabsParamsList>;
  HomeStack: NavigatorScreenParams<THomeStackParamList>;
  DocumentsStack: NavigatorScreenParams<TDocumentStackParamList>;
  StatisticsStack: NavigatorScreenParams<TStatisticsStackParamList>;
  SocialMediaStack: NavigatorScreenParams<TSocialMediaStackParamList>;
  SettingStack: NavigatorScreenParams<TSettingStackParamList>;
};

const Stack = createStackNavigator<TMainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'MyTab'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'MyTab'} component={MyTabs} />
      <Stack.Screen name={'HomeStack'} component={HomeStack} />
      <Stack.Screen name={'DocumentsStack'} component={DocumentsStack} />
      <Stack.Screen name={'StatisticsStack'} component={StatisticsStack} />
      <Stack.Screen name={'SocialMediaStack'} component={SocialMediaStack} />
      <Stack.Screen name={'SettingStack'} component={SettingStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
