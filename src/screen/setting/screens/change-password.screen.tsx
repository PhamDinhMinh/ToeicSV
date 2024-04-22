import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {TSettingStackParamList} from '@/routes/setting-stack';
import {Button, Icon} from '@rneui/themed';
import globalStyles, {color} from '@/global-style';
import {SafeAreaView} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import settingService from '../services/setting.services';
import Toast from 'react-native-toast-message';
import Loading from '@/screen/components/loading';

const ChangePasswordScreen = ({
  navigation,
}: StackScreenProps<TSettingStackParamList, 'ChangePasswordScreen'>) => {
  const language = useTranslation();

  const fields: {
    key: 'currentPassword' | 'newPassword' | 'confirmPassword';
    label: string;
    pattern?: any;
  }[] = [
    {key: 'currentPassword', label: 'currentPassword'},
    {
      key: 'newPassword',
      label: 'newPassword',
      pattern: {
        value: /^(?=.*[A-Za-z]).{8,}$/,
        message: 'password-pattern-error-message',
      },
    },
    {key: 'confirmPassword', label: 'confirmPassword'},
  ];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [secureText, setSecureText] = useState({
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  const toggleSecureText = (
    key: 'currentPassword' | 'newPassword' | 'confirmPassword',
  ) => {
    let l = secureText;
    l[key] = !secureText[key];
    setSecureText({...secureText, ...l});
  };

  const newPassword = useWatch({control: control, name: 'newPassword'});

  const checkConfirm = (v: string) => {
    return v === newPassword;
  };

  const {mutate, status} = useMutation({
    mutationFn: params => settingService.changePassword(params),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: language.t('change-pass-success'),
        topOffset: 80,
        visibilityTime: 500,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.data,
        topOffset: 80,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.content}>
        <View style={{flex: 1}}>
          {fields.map(field => (
            <Controller
              key={field.key}
              name={field.key}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: language.t('required-error-message'),
                },
                pattern: field.pattern || {},
                validate:
                  field.key === 'confirmPassword'
                    ? {
                        matchPassword: v =>
                          checkConfirm(v) ||
                          language.t('password-not-matching-error-message'),
                      }
                    : {},
              }}
              render={({field: {value, onChange}}) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>{language.t(field.label)}</Text>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: '#f1f2f8',
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={secureText[field.key]}
                      style={styles.input}
                    />
                    <Icon
                      onPress={() => toggleSecureText(field.key)}
                      type="feather"
                      name={secureText[field.key] ? 'eye' : 'eye-off'}
                      iconStyle={{padding: 5}}
                      size={20}
                      color={'#8C881B'}
                    />
                  </View>
                  <Text style={styles.errors}>
                    {errors[field.key]?.message
                      ? //@ts-ignore
                        language.t(errors[field.key]?.message)
                      : ''}
                  </Text>
                </View>
              )}
            />
          ))}
        </View>

        <Button
          title={language.t('changePass')}
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.button}
          disabled={status === 'pending'}
        />
      </KeyboardAvoidingView>
      {status === 'pending' && <Loading />}
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  itemContainer: {
    marginBottom: 20,
  },
  input: {
    ...globalStyles.text17Medium,
    height: 40,
    width: '90%',
  },
  title: {
    ...globalStyles.text17Bold,
    color: 'black',
  },
  errors: {
    ...globalStyles.text13Bold,
    color: color.red_500,
  },
  button: {
    backgroundColor: color.green_400,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
