import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PartDetailScreen from '@/screen/home/screens/part-detail.screen';
import {IItemPart} from '@/screen/home/screens/home.screen';

export type THomeStackParamList = {
  PartDetailScreen: {
    item: IItemPart;
  };
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
        name="PartDetailScreen"
        component={PartDetailScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
