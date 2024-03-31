import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalScreen from '@/screen/personal/screens/personal.screen';
import SettingScreen from '@/screen/personal/screens/setting.screen';

export type TSettingStackParamList = {
  SettingScreen: undefined;
  PersonalScreen: undefined;
};

const Stack = createNativeStackNavigator<TSettingStackParamList>();

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
