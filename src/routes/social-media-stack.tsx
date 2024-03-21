import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocialMediaScreen from '@/screen/social-media/screens/social-media.screen';

export type TAuthStackParamList = {
  SocialMediaScreen: undefined;
};

const Stack = createNativeStackNavigator<TAuthStackParamList>();

const SocialMediaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SocialMediaScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SocialMediaScreen" component={SocialMediaScreen} />
    </Stack.Navigator>
  );
};

export default SocialMediaStack;
