import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/screen/authentication/login/login.screen';
import RegisterScreen from '@/screen/authentication/register/register.screen';

export type TAuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<TAuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      //@ts-ignore;
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
