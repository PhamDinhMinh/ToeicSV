import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export type TMainStackParamsList = {};

const Stack = createStackNavigator<TMainStackParamsList>();

const MainStack = () => {
  return (
    <View>
      <Text>MainStack</Text>
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
