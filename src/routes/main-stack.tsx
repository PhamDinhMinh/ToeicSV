import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import MyTabs, {TMyTabsParamsList} from './my-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import DocumentsStack, {TDocumentStackParamList} from './documents-stack';

export type TMainStackParamList = {
  MyTab: NavigatorScreenParams<TMyTabsParamsList>;
  DocumentsStack: NavigatorScreenParams<TDocumentStackParamList>;
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
    </Stack.Navigator>
  );
};

export default MainStack;
