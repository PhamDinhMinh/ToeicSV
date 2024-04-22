import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import MyTabs, {TMyTabsParamsList} from './my-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import DocumentsStack, {TDocumentStackParamList} from './documents-stack';
import SocialMediaStack, {
  TSocialMediaStackParamList,
} from './social-media-stack';
import SettingStack, {TSettingStackParamList} from './setting-stack';

export type TMainStackParamList = {
  MyTab: NavigatorScreenParams<TMyTabsParamsList>;
  DocumentsStack: NavigatorScreenParams<TDocumentStackParamList>;
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
      <Stack.Screen name={'DocumentsStack'} component={DocumentsStack} />
      <Stack.Screen name={'SocialMediaStack'} component={SocialMediaStack} />
      <Stack.Screen name={'SettingStack'} component={SettingStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
