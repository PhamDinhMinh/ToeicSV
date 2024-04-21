import React from 'react';
import SocialListLikeScreen from '@/screen/social-media/screens/social-list-like.screen';
import SocialCommentPostScreen from '@/screen/social-media/screens/social-comment-post.screen';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import SocialProfileScreen from '@/screen/social-media/screens/social-profile.screen';
import PostDetailScreen from '@/screen/social-media/screens/post-detail.screen';

export type TSocialMediaStackParamList = {
  SocialListLikeScreen: {
    postId: number;
    commentId: number;
  };
  SocialCommentPostScreen: {
    postId: number;
  };
  SocialProfileScreen: {
    userId: number;
  };
  PostDetailScreen: {
    postId: number;
  };
};

const Stack = createStackNavigator<TSocialMediaStackParamList>();

const SocialMediaStack = () => {
  const language = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SocialListLikeScreen"
        component={SocialListLikeScreen}
        options={{
          headerShown: true,
          title: language.t('reactors'),
        }}
      />
      <Stack.Screen
        name="SocialCommentPostScreen"
        component={SocialCommentPostScreen}
        options={{
          headerShown: true,
          title: language.t('comment'),
        }}
      />
      <Stack.Screen
        name="SocialProfileScreen"
        component={SocialProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{
          headerShown: true,
          title: language.t('Chi tiết bài viết'),
        }}
      />
    </Stack.Navigator>
  );
};

export default SocialMediaStack;
