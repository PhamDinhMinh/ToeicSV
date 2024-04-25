import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import globalStyles, {color} from '@/global-style';
import BaseFormInput from '@/screen/components/form/base-form-input';

type TFormFields = {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
};

type TFormUpdateInformation = {};
const fields = [
  {
    label: 'Tên',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Địa chỉ email',
    name: 'emailAddress',
    type: 'email',
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
  },
];

const FormUpdateInformation = ({}: TFormUpdateInformation) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
    },
  });

  return (
    <View>
      {/* {fields.map(item => (
        <Controller
          control={control}
          name={item.name as keyof TFormFields}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.itemInput}>
              <Text style={styles.textLabel}>{item.label}</Text>
              <BaseFormInput
                required={true}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                type={item.type}
              />
            </View>
          )}
        />
      ))} */}
    </View>
  );
};

export default FormUpdateInformation;

const styles = StyleSheet.create({
  itemInput: {
    paddingHorizontal: 16,
  },
  textLabel: {
    ...globalStyles.text16Regular,
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
