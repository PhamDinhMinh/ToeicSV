import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTabBarSize} from '../hooks/use-tab-tar.hook';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '@/global-style';

type TTabUi = BottomTabBarProps;

const TabUi = (props: TTabUi) => {
  const {state, navigation, descriptors} = props;
  const {centerTabWidth, tabBarHeight, tabWidth, cycleButtonWidth} =
    useTabBarSize();
  const insets = useSafeAreaInsets();

  const getIcon = (tab: any, isFocused: boolean) => {
    switch (tab) {
      case 'Home': {
        return isFocused ? (
          <Icon type="ionicon" name="home" color={color.green_500} size={26} />
        ) : (
          <Icon
            type="ionicon"
            name="home-outline"
            color={color.grey_700}
            size={26}
          />
        );
      }
      case 'Documents': {
        return isFocused ? (
          <Icon
            type="ionicon"
            name="document-text"
            color={color.green_500}
            size={26}
          />
        ) : (
          <Icon
            type="ionicon"
            name="document-text-outline"
            color={color.grey_700}
            size={26}
          />
        );
      }
      case 'Statistics': {
        return isFocused ? (
          <Icon
            type="ionicon"
            name="bar-chart"
            color={color.green_500}
            size={26}
          />
        ) : (
          <Icon
            type="ionicon"
            name="bar-chart-outline"
            color={color.grey_700}
            size={26}
          />
        );
      }
      case 'SocialMedia': {
        return isFocused ? (
          <Icon
            type="ionicon"
            name="share-social"
            color={color.green_500}
            size={26}
          />
        ) : (
          <Icon
            type="ionicon"
            name="share-social-outline"
            color={color.grey_700}
            size={26}
          />
        );
      }
      case 'Settings': {
        return isFocused ? (
          <Icon
            type="ionicon"
            name="settings"
            color={color.green_500}
            size={26}
          />
        ) : (
          <Icon
            type="ionicon"
            name="settings-outline"
            color={color.grey_700}
            size={26}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopColor: color.grey_300,
        shadowColor: '#ccc',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        borderTopWidth: 0.2,
      }}>
      {state.routes.map(
        (route, index) => {
          const {options} = descriptors[route.key];
          const label = String(
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name,
          );

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // if (index !== Math.floor(state.routes.length / 2)) {
          return (
            <SafeAreaView
              edges={['bottom']}
              key={route.name}
              style={{
                height: insets.bottom + tabBarHeight,
              }}>
              <TouchableOpacity
                onLongPress={onLongPress}
                onPress={onPress}
                style={{
                  width: tabWidth,
                  height: '100%',
                  paddingTop: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {getIcon(route.name, isFocused)}
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 13,
                    color: isFocused ? color.green_500 : color.grey_700,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        },
        // return (
        //   <View
        //     key={route.name}
        //     style={{
        //       width: centerTabWidth,
        //       alignItems: 'center',
        //       zIndex: 100,
        //       height: tabBarHeight,
        //     }}></View>
        // );
      )}
    </View>
  );
};

export default TabUi;
