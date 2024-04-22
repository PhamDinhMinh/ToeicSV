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
import {TAuthStackParamList} from '@/routes/auth-stack';
import {Controller, useForm} from 'react-hook-form';
import BackButton from '@/screen/components/back-button';
import FastImage from 'react-native-fast-image';
import globalStyles, {color} from '@/global-style';
import {useTranslation} from 'react-i18next';
import TextInputComponent from '../components/text-input.component';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import authService from '../services/auth.services';
import {useLoginRequest} from '../hooks/hook';
import Toast from 'react-native-toast-message';
import Loading from '@/screen/components/loading';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<TAuthStackParamList, 'RegisterScreen'>;

const RegisterScreen = ({navigation}: props) => {
  const language = useTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(language.t('required-error-message')),
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
      field: 'name',
      label: 'name',
      type: 'text',
      placeholder: 'name',
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
      keyboardType: 'phone-pad',
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
      name: '',
      userName: '',
      phoneNumber: '',
      emailAddress: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {mutate: loginRequest} = useLoginRequest();

  const {mutate: register, status: statusRegister} = useMutation({
    mutationFn: (params: any) => authService.register(params),
    onSuccess: (_, params) => {
      Toast.show({
        type: 'success',
        text1: 'Đăng ký thành công!',
        topOffset: 80,
      });
      loginRequest({
        password: params.password,
        userNameOrEmail: params.userName,
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.data,
        topOffset: 80,
      });
    },
  });

  const onSubmit = (data: any) => {
    register(data);
  };

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
        <SafeAreaView style={{alignItems: 'center', flex: 1}}>
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
                disabled={statusRegister === 'pending'}
                onPress={handleSubmit(onSubmit)}
                containerStyle={{marginTop: 20}}
                buttonStyle={{
                  marginHorizontal: 20,
                  borderRadius: 20,
                  backgroundColor: color.green_300,
                }}>
                {language.t('signUp')}
              </Button>
            </View>
          </View>
        </SafeAreaView>
        {statusRegister === 'pending' && <Loading />}
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
