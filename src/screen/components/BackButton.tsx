import {Pressable} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {color} from '@/global-style';

const BackButton = ({navigation}: any) => {
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: color.grey_200,
        width: 40,
        aspectRatio: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon type="ionicon" name="arrow-back" color={'black'} size={26} />
    </Pressable>
  );
};

export default BackButton;
