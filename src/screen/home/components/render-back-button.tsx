import {Pressable} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

type TRenderBackButton = {
  setModalConfirm: any;
};

const RenderBackButton = (props: TRenderBackButton) => {
  const {setModalConfirm} = props;

  return (
    <Pressable
      onPress={() => {
        setModalConfirm(true);
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
