import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Icon} from '@rneui/base';
import {TSettingStackParamList} from '@/routes/setting-stack';
import UserInformationHeader from '../components/user-information-header';
import FormUpdateInformation from '../components/form-update-information';

type props = StackScreenProps<TSettingStackParamList, 'PersonalScreen'>;

const PersonalScreen = ({navigation}: props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back"
          type="ionicon"
          color={'white'}
          containerStyle={styles.iconGoBack}
        />
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <UserInformationHeader />
          <ScrollView style={styles.viewEdit}>
            <FormUpdateInformation navigation={navigation} />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    flex: 1,
  },
  iconGoBack: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 0,
    zIndex: 1000,
    left: 16,
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 100,
  },
  viewEdit: {},
});
