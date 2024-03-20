import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Button} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {TAuthStackParamList} from '@/routes/AuthStack';
import {useToast} from 'react-native-toast-notifications';
import {Controller, useForm} from 'react-hook-form';
import BackButton from '@/screen/components/BackButton';
import FastImage from 'react-native-fast-image';
import globalStyles, {color} from '@/global-style';
import {useTranslation} from 'react-i18next';
import TextInputComponent from '../components/TextInputComponent';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<TAuthStackParamList, 'RegisterScreen'>;

const RegisterScreen = ({navigation}: props) => {
  const toast = useToast();
  const language = useTranslation();

  const schema = yup.object().shape({
    fullName: yup.string().required(language.t('required-error-message')),
    emailAddress: yup
      .string()
      .email(language.t('emailInvalid'))
      .required(language.t('required-error-message')),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, language.t('passwordInvalid'))
      .min(8)
      .required(language.t('required-error-message')),
    userName: yup
      .string()
      .required(language.t('required-error-message'))
      .matches(/^(?=[a-zA-Z0-9._]{6,20}$)/, language.t('userNameInvalid')),
    phoneNumber: yup
      .string()
      .matches(
        /(([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b)|^$/,
        language.t('phoneNumberInvalid'),
      ),
  });

  const registerField: {
    field: any;
    label: any;
    type?: any;
    placeholder?: any;
    autoCapitalize?: any;
    keyboardType?: any;
    required?: boolean;
    secureTextEntry?: boolean;
  }[] = [
    {
      field: 'fullName',
      label: 'fullName',
      type: 'text',
      placeholder: 'fullName',
      autoCapitalize: 'words',
      required: true,
    },
    {
      field: 'userName',
      label: 'userName',
      type: 'text',
      placeholder: 'userName',
      required: true,
    },

    {
      field: 'emailAddress',
      label: 'email',
      type: 'text',
      placeholder: 'email',
      keyboardType: 'email-address',
      required: true,
    },
    {
      field: 'phoneNumber',
      label: 'phoneNumber',
      type: 'text',
      placeholder: 'phoneNumber',
    },
    {
      field: 'password',
      label: 'password',
      type: 'text',
      placeholder: 'password',
      secureTextEntry: true,
      required: true,
    },
  ];

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      userName: '',
      phoneNumber: '',
      emailAddress: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {};

  const renderBackButton = useCallback(
    () => <BackButton {...{navigation}} />,
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: renderBackButton,
      headerShown: true,
      headerTitle: '',
      headerBackTitleVisible: false,
      headerTransparent: true,
      headerTintColor: 'black',
    });
  }, [navigation, renderBackButton]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
          paddingBottom: 10,
        }}>
        <SafeAreaView
          style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <FastImage
            style={{width: 180, height: 180}}
            source={require('@/assets/images/logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: width * 0.1,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '100%',
                marginBottom: 'auto',
              }}>
              {registerField
                .filter(f => f.type === 'text')
                .map(field => (
                  <Controller
                    control={control}
                    name={field.field}
                    key={field.field}
                    render={({
                      field: {value, onChange},
                      fieldState: {error},
                    }) => (
                      <TextInputComponent
                        value={value}
                        onChangeText={onChange}
                        inputStyle={[globalStyles.text17Medium]}
                        placeholder={`${language.t(field.placeholder)} ${
                          field.required ? '*' : ''
                        }`}
                        containerStyle={{
                          marginTop: 10,
                          backgroundColor: '#f8f8f8',
                          borderWidth: 1.04,
                          borderColor: '#44A093',
                        }}
                        secureTextEntry={field.secureTextEntry}
                        autoCapitalize={field.autoCapitalize || 'none'}
                        error={language.t(error?.message ?? '')}
                      />
                    )}
                  />
                ))}
              <Button
                // disabled={status === 'loading'}
                onPress={handleSubmit(onSubmit)}
                containerStyle={{marginTop: 20}}
                buttonStyle={{
                  marginHorizontal: 20,
                  borderRadius: 20,
                  backgroundColor: color.green_300,
                }}>
                {language.t('signIn')}
              </Button>
            </View>
          </View>
        </SafeAreaView>
        {/* {status === 'loading' && <Loading />} */}
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
