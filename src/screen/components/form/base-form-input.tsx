import {Platform, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {FieldErrorsImpl} from 'react-hook-form';
import SelectionInput from './select-input';
import DateInput from './date-time-input';
import globalStyles, {color} from '@/global-style';

type TBaseFormInput = {
  placeholder?: string;
  type: string;
  label?: string;
  required?: boolean;
  onChange: (value: any) => void;
  value: any;
  error?: FieldErrorsImpl;
  onBlur?: any;
  options?: any[];
  editable?: boolean;
};

const BaseFormInput = (props: TBaseFormInput) => {
  const {type, onChange, value, onBlur, options, editable} = props;

  switch (type) {
    case 'text':
      return (
        <TextInput
          placeholder="Last name"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={styles.baseInput}
          editable={editable}
        />
      );
    case 'select':
      return (
        <SelectionInput options={options} setValue={onChange} value={value} />
      );
    case 'date':
      return <DateInput setValue={onChange} value={value} />;
  }
  return <></>;
};

export default BaseFormInput;

const styles = StyleSheet.create({
  baseInput: {
    ...globalStyles.text16Regular,
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    borderColor: color.green_base_300,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
  },
});
