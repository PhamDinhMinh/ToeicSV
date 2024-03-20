import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalScreen from '@/screen/personal/screens/PersonalScreen';

export type TSettingStackParamList = {
  PersonalScreen: undefined;
};

const Stack = createNativeStackNavigator<TSettingStackParamList>();

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
