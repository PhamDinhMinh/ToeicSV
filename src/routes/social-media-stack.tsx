import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListReactScreen from '@/screen/social-media/screens/list-react.screen';

export type TSocialMediaStackParamList = {
  SocialMediaScreen: undefined;
  ListReactScreen: undefined;
};

const Stack = createNativeStackNavigator<TSocialMediaStackParamList>();

const SocialMediaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SocialMediaScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ListReactScreen" component={ListReactScreen} />
    </Stack.Navigator>
  );
};

export default SocialMediaStack;
