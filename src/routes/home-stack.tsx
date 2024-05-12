import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@/screen/home/screens/home.screen';

export type THomeStackParamList = {
  HomeScreen: undefined;
};

const Stack = createStackNavigator<THomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
