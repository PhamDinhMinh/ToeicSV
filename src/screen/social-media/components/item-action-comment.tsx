import {StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import {ICommentResponse} from '../services/social-media.model';
import {useTranslation} from 'react-i18next';

type TItemActionComment = {
  contentDes: string;
  nameIcon: string;
  typeIcon: string;
  comment: ICommentResponse;
  handle?: (comment: ICommentResponse) => void;
  handleModalClose: () => void;
};
const ItemActionComment = (props: TItemActionComment) => {
  const {contentDes, nameIcon, typeIcon, comment, handle, handleModalClose} =
    props;
  const language = useTranslation();
  const [colorPress, setColorPress] = useState('#FFF');

  const handlePress = () => {
    if (contentDes === language.t('copy-comment')) {
      Clipboard.setString(comment.comment);
      Toast.show({
        type: 'success',
        text1: language.t('copy-success'),
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
      });
    } else {
      handle && handle(comment);
    }
    handleModalClose();
  };

  const handlePresIn = () => {
    setColorPress('#ccc');
  };

  const handlePressOut = () => {
    setColorPress('#FFF');
  };

  return (
    <Pressable
      style={[styles.itemAction, {backgroundColor: colorPress}]}
      onPress={() => handlePress()}
      onPressIn={handlePresIn}
      onPressOut={handlePressOut}>
      <Icon
        name={nameIcon}
        type={typeIcon}
        color="black"
        containerStyle={{
          paddingHorizontal: 10,
        }}
      />
      <Text style={styles.textIconAction}>{contentDes}</Text>
    </Pressable>
  );
};

export default ItemActionComment;

const styles = StyleSheet.create({
  textIconAction: {
    fontSize: 16,
    color: 'black',
  },
  itemAction: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
});
