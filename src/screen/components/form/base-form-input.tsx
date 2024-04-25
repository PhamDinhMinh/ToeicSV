import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {FieldErrorsImpl} from 'react-hook-form';
import SelectionInput from './select-input';
import DateInput from './date-time-input';

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
};

const BaseFormInput = (props: TBaseFormInput) => {
  const {type, error, onChange, value, onBlur, options} = props;

  switch (type) {
    case 'text':
      return (
        <TextInput
          placeholder="Last name"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
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

const styles = StyleSheet.create({});
