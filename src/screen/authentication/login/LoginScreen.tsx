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
import {TAuthStackParamList} from '@/routes/AuthStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles, {color} from '@/global-style';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import TextInputComponent from '../components/TextInputComponent';
import {Button, useTheme} from '@rneui/themed';
import ChangLanguageButton from '@/screen/components/ChangeLanguageButton';
import {useTranslation} from 'react-i18next';

const {height} = Dimensions.get('screen');

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

const LoginScreen = ({navigation}: props) => {
  const language = useTranslation();
  const {theme} = useTheme();

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
              <Button
                onPress={handleSubmit(onSubmit, onError)}
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
        {/* {status === 'loading' && <Loading />} */}
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
