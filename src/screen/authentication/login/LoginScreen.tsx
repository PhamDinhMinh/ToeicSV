import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {TAuthStackParamList} from '@/routes/AuthStack';
import {useTranslation} from 'react-i18next';

type props = StackScreenProps<TAuthStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView>
      <Text>{t('key')}</Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
