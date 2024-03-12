import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';

const RegisterScreen = () => {
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
            <TouchableOpacity>
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
