import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {TMainStackParamList} from '@/routes/main-stack';
import {TMyTabsParamsList} from '@/routes/my-tabs';
import SocialMediaHeader from '../components/social-media-header';

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'SocialMedia'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const SocialMediaScreen = ({navigation}: props) => {
  return (
    <View style={styles.container}>
      <SocialMediaHeader navigation={navigation} />
      <Text>SocialMediaScreen</Text>
    </View>
  );
};

export default SocialMediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F8',
  },
});
