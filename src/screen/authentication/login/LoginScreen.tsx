import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {TAuthStackParamList} from '@/routes/AuthStack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles, {color} from '@/global-style';
import Logo from '@/assets/images/logo.png';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import TextInputComponent from '../components/TextInputComponent';
import {Button} from '@rneui/themed';

const loginField = [
  {
    key: 'userNameOrEmailAddress',
    rules: {
      required: {
        value: true,
        message: 'required-error-message',
      },
    },
    defaultValues: '',
    label: 'userOrEmail',
    placeholder: 'userOrEmail',
  },
  {
    key: 'password',
    rules: {
      required: {
        value: true,
        message: 'required-error-message',
      },
    },
    defaultValues: '',
    label: 'password',
    placeholder: 'password',
    secureTextEntry: true,
  },
];

type props = StackScreenProps<TAuthStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation, route}: props) => {
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userNameOrEmailAddress: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    console.log(data, 'kk');
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {/* <StatusBar barStyle={'default'} /> */}
      <ScrollView contentContainerStyle={{height: '100%'}} style={{flex: 1}}>
        <SafeAreaView edges={['top']} style={{alignItems: 'center', flex: 1}}>
          <View style={{width: '100%'}}>
            {/* <ChangLanguageButton
              containerStyle={{position: 'absolute', top: 0, right: 5}}
            /> */}
          </View>
          <Text
            style={[
              globalStyles.text22Medium,
              {color: color.green_600, textAlign: 'center', width: '70%'},
            ]}>
            {/* {language.t(languageKeys.auth.intro)} */}
          </Text>
          <FastImage
            style={{width: 200, height: 200}}
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SafeAreaView>

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
                rules={field.rules}
                render={({field: {value, onChange}}) => {
                  return (
                    <TextInputComponent
                      error={
                        //@ts-ignore
                        errors[field.key]
                      }
                      value={value}
                      onChangeText={onChange}
                      inputStyle={[globalStyles.text17Medium]}
                      placeholder={field.placeholder}
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
            {/* <Text
              // onPress={() => navigation.navigate('ForgotPassword')}
              style={[
                {textAlign: 'right', color: color.greenOfficial},
                globalStyles.text16Regular,
              ]}>
              {language.t(languageKeys.auth.forgotPass)}?
            </Text> */}
            <Button
              onPress={handleSubmit(onSubmit, onError)}
              containerStyle={{marginTop: 20}}
              buttonStyle={{
                marginHorizontal: 20,
                borderRadius: 20,
                backgroundColor: color.green_300,
              }}
              // title={language.t(languageKeys.auth.signIn)}
              title="Đăng nhập"
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
            Bạn chưa có tk
            {/* {language.t(languageKeys.auth['Bạn chưa có tài khoản?'])}{' '} */}
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{color: color.green_700}}>
              {/* {language.t(languageKeys.auth['Đăng ký ngay'])} */}
              Đăng ký đi
            </Text>
          </Text>
        </SafeAreaView>
        {/* {status === 'loading' && <Loading />} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
