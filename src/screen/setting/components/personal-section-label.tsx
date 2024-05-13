import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import globalStyles, {color} from '@/global-style';

const PersonalSectionLabel = ({label}: {label: string | undefined}) => {
  const language = useTranslation();
  if (!label) {
    return <></>;
  }

  return (
    <Text style={[styles.text, {color: color.green_base_500}]}>
      {language.t(label)}
    </Text>
  );
};

export default PersonalSectionLabel;

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text16Medium,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
});
