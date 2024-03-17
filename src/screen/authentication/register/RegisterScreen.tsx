import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {TAuthStackParamList} from '@/routes/AuthStack';

type props = StackScreenProps<TAuthStackParamList, 'LoginScreen'>;

const RegisterScreen = ({navigation}: props) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
          marginBottom: 10,
        }}>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
