import React from 'react';
import PersonalScreen from '@/screen/setting/screens/personal.screen';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePasswordScreen from '@/screen/setting/screens/change-password.screen';
import {useTranslation} from 'react-i18next';

export type TSettingStackParamList = {
  SettingScreen: undefined;
  PersonalScreen: undefined;
  ChangePasswordScreen: undefined;
};

const Stack = createStackNavigator<TSettingStackParamList>();

const SettingStack = () => {
  const language = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: language.t('changePass'),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
