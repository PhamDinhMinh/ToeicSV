import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {TAuthStackParamList} from '@/routes/auth-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles, {color} from '@/global-style';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import TextInputComponent from '../components/text-input.component';
import {Button, useTheme} from '@rneui/themed';
import ChangLanguageButton from '@/screen/components/button/change-language-button';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useLoginRequest} from '../hooks/hook';
import Loading from '@/screen/components/loading/loading';

const {height} = Dimensions.get('screen');

const loginField = [
  {
    key: 'userNameOrEmail',
    defaultValues: '',
    label: 'userOrEmail',
    placeholder: 'userOrEmail',
    required: true,
  },
  {
    key: 'password',
    defaultValues: '',
    label: 'password',
    placeholder: 'password',
    secureTextEntry: true,
    required: true,
  },
];

type props = StackScreenProps<TAuthStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: props) => {
  const language = useTranslation();
  const {theme} = useTheme();

  const schema = yup.object().shape({
    userNameOrEmail: yup
      .string()
      .required(language.t('required-error-message')),
    password: yup.string().required(language.t('required-error-message')),
  });

  const {control, handleSubmit} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userNameOrEmail: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {mutate, status} = useLoginRequest();

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    mutate(data);
  };

  const onError = (error: any) => {
    console.log(error, 'Lỗi');
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}>
      <ScrollView
        contentContainerStyle={{height: '100%'}}
        style={styles.container}>
        <SafeAreaView
          style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <View style={{width: '100%'}}>
            <ChangLanguageButton
              containerStyle={{position: 'absolute', top: 10, right: 10}}
            />
          </View>
          <FastImage
            style={{width: 200, height: 200, marginTop: height * 0.1}}
            source={require('@/assets/images/logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: '10%',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '100%',
                marginBottom: 'auto',
              }}>
              {loginField.map(field => (
                <Controller
                  key={field.key}
                  control={control}
                  //@ts-ignore
                  name={field.key}
                  // rules={field.rules}
                  render={({field: {value, onChange}, fieldState: {error}}) => {
                    return (
                      <TextInputComponent
                        error={language.t(error?.message ?? '')}
                        value={value}
                        onChangeText={onChange}
                        inputStyle={[globalStyles.text17Medium]}
                        placeholder={language.t(field.placeholder)}
                        containerStyle={{
                          marginTop: 10,
                          backgroundColor: '#f8f8f8',
                          borderWidth: 1.04,
                          borderColor: '#44A093',
                        }}
                        secureTextEntry={field.secureTextEntry}
                        isTenancy={field.key === 'tenancyName'}
                        //@ts-ignore
                        defaultValues={field.defaultValues}
                      />
                    );
                  }}
                />
              ))}
              <Text
                // onPress={() => navigation.navigate('ForgotPassword')}
                style={[
                  {textAlign: 'right', color: color.green_700},
                  globalStyles.text16Regular,
                ]}>
                {language.t('forgotPass')}?
              </Text>
              <Button
                onPress={handleSubmit(onSubmit, onError)}
                disabled={status === 'pending'}
                containerStyle={{marginTop: 20}}
                buttonStyle={{
                  marginHorizontal: 20,
                  borderRadius: 20,
                  backgroundColor: color.green_300,
                }}
                title={language.t('signIn')}
              />
            </View>
          </View>
          <SafeAreaView
            edges={['bottom']}
            style={{
              flex: 1,
              marginBottom: '10%',
              marginTop: 20,
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: color.grey_800,
                  marginBottom: 'auto',
                },
                globalStyles.text16Regular,
              ]}>
              {language.t('promptNoAccount')}{' '}
              <Text
                onPress={() => navigation.navigate('RegisterScreen')}
                style={{color: color.green_700}}>
                {language.t('signUpNow')}
              </Text>
            </Text>
          </SafeAreaView>
        </SafeAreaView>
        {status === 'pending' && <Loading />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
