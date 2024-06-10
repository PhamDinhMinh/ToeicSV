import {Pressable} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

type TRenderBackButton = {
  reset: any;
  setIndexView: any;
  navigation: any;
};

const RenderBackButton = (props: TRenderBackButton) => {
  const {reset, setIndexView, navigation} = props;
  return (
    <Pressable
      onPress={() => {
        reset();
        setIndexView(-1);
        navigation.goBack();
      }}
      style={{
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

export default RenderBackButton;
