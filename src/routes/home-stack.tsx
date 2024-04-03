import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export type THomeStackParamsList = {};

const Stack = createStackNavigator<THomeStackParamsList>();

const HomeStack = () => {
  return (
    <View>
      <Text>MainStack</Text>
    </View>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
