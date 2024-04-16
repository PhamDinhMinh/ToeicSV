import React from 'react';
import ListReactScreen from '@/screen/social-media/screens/list-react.screen';
import SocialCommentPostScreen from '@/screen/social-media/screens/social-comment-post.screen';
import {createStackNavigator} from '@react-navigation/stack';

export type TSocialMediaStackParamList = {
  ListReactScreen: undefined;
  SocialCommentPostScreen: {
    postId: number;
  };
};

const Stack = createStackNavigator<TSocialMediaStackParamList>();

const SocialMediaStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="ListReactScreen" component={ListReactScreen} />
      <Stack.Screen
        name="SocialCommentPostScreen"
        component={SocialCommentPostScreen}
        options={{
          headerShown: true,
          title: 'Bình luận',
        }}
      />
    </Stack.Navigator>
  );
};

export default SocialMediaStack;
