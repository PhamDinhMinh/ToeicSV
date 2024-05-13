import React, {useId, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View, Text, Keyboard} from 'react-native';
import globalStyles, {color} from '@/global-style';
import BaseFormInput from '@/screen/components/form/base-form-input';
import useAccountStore from '@/stores/account.store';
import {Button} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {useMutation} from '@tanstack/react-query';
import settingService from '../services/setting.services';
import Toast from 'react-native-toast-message';

type TFormFields = {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
};

const FormUpdateInformation = ({navigation}: any) => {
  const uid = useId();
  const account = useAccountStore(state => state?.account);
  const setAccount = useAccountStore(state => state.setAccount);
  const language = useTranslation();
  const [editing, setEditing] = useState(false);

  const fields = [
    {
      label: 'Tên',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Địa chỉ email',
      name: 'emailAddress',
      type: 'text',
    },
    {
      label: 'Số điện thoại',
      name: 'phoneNumber',
      type: 'text',
    },
    {
      label: 'Ngày sinh',
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      label: 'Giới tính',
      name: 'gender',
      type: 'select',
      options: [
        {value: 'Name', label: 'Nam'},
        {value: 'Nữ', label: 'Nữ'},
        {value: 'Khác', label: 'Khác'},
      ],
    },
  ];

  const {mutate: updateUser, status} = useMutation({
    mutationFn: (params: any) => settingService.updateUser(params),
    onSuccess: (_, params) => {
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: language.t('edit-success'),
        topOffset: 80,
        visibilityTime: 800,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
      if (account) {
        setAccount({
          ...account,
          name: params?.name,
          emailAddress: params?.emailAddress,
          phoneNumber: params?.phoneNumber,
          dateOfBirth: params?.dateOfBirth,
          gender: params?.gender,
        });
      }
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

  const {
    control,
    handleSubmit,
    formState: {isDirty},
  } = useForm({
    defaultValues: {
      name: account?.name,
      emailAddress: account?.emailAddress,
      phoneNumber: account?.phoneNumber,
      dateOfBirth: account?.dateOfBirth,
      gender: account?.gender,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    updateUser(data);
    setEditing(false);
  };

  return (
    <View>
      {fields.map((item, index) => (
        <Controller
          key={uid + index}
          control={control}
          name={item.name as keyof TFormFields}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.itemInput}>
              <Text style={styles.textLabel}>{item.label}</Text>
              <BaseFormInput
                // error={language.t(error?.message ?? '')}
                required={true}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                type={item.type}
                options={item?.options}
                editable={editing}
              />
            </View>
          )}
        />
      ))}
      <Button
        onPress={editing ? handleSubmit(onSubmit) : () => setEditing(true)}
        disabled={(editing ? !isDirty : false) || status === 'pending'}
        containerStyle={{marginTop: 20}}
        buttonStyle={{
          marginHorizontal: 20,
          borderRadius: 16,
          backgroundColor: !editing
            ? color.green_base_300
            : color.green_base_300,
        }}
        title={editing ? 'Lưu' : 'Chỉnh sửa'}
      />
    </View>
  );
};

export default FormUpdateInformation;

const styles = StyleSheet.create({
  itemInput: {
    paddingHorizontal: 16,
  },
  textLabel: {
    ...globalStyles.text14Bold,
    paddingTop: 15,
    paddingBottom: 5,
  },
  textInput: {
    borderRadius: 4,
    borderColor: color.grey_400,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    ...globalStyles.text16Medium,
  },
});
