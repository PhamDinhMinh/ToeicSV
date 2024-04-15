import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SocialMediaScreen from '@/screen/social-media/screens/social-media.screen';
import SettingStack from './setting-stack';
import {useTranslation} from 'react-i18next';
import TabUi from '@/screen/components/bottom-tab/tab-ui';
import DocumentScreen from '@/screen/documents/document.screen';

export type TMyTabsParamsList = {
  Home: undefined;
  Documents: undefined;
  Statistics: undefined;
  SocialMedia: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TMyTabsParamsList>();

const MyTabs = () => {
  const language = useTranslation();
  const renderTab = (tabBarProps: BottomTabBarProps) => (
    <TabUi {...tabBarProps} />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderTab}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          title: language.t('home-tab'),
          lazy: false,
        }}
        component={DocumentScreen}
      />
      <Tab.Screen
        name="Documents"
        options={{
          title: language.t('documents-tab'),
          lazy: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
        component={DocumentScreen}
      />
      <Tab.Screen
        name="Statistics"
        options={{
          title: language.t('statistics-tab'),
          lazy: false,
        }}
        component={SettingStack}
      />
      <Tab.Screen
        name="SocialMedia"
        options={{
          title: language.t('social-tab'),
          lazy: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
        component={SocialMediaScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title: language.t('setting-tab'),
          lazy: false,
        }}
        component={SettingStack}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
