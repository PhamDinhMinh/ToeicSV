import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {IPostResponse} from '../services/social-media.model';
import globalStyles, {color} from '@/global-style';

type TItemAction = {
  handle: () => void;
  content: string;
};

const ItemAction = (props: TItemAction) => {
  const {content, handle} = props;
  const [backgroundItem, setBackgroundItem] = useState('white');

  const handlePressIn = () => {
    setBackgroundItem('#00000020');
  };

  const handlePressOut = () => {
    setBackgroundItem('white');
  };

  return (
    <Pressable
      onPress={handle}
      style={[styles.button, {backgroundColor: backgroundItem}]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Text style={styles.text}>{content}</Text>
    </Pressable>
  );
};

type TPostTooltipController = {
  toggleOpen: () => void;
  open: any;
  post: IPostResponse;
  navigation: any;
  setModalConfirm: any;
};
const PostTooltipController = ({
  toggleOpen = () => {},
  open,
  setModalConfirm,
  post,
  ...props
}: React.ComponentProps<typeof Tooltip> & TPostTooltipController) => {
  const language = useTranslation();

  const onDelete = () => {
    toggleOpen();
    setTimeout(() => setModalConfirm(true), 300);
  };

  const onEdit = () => {};

  const listItemAction = [
    {
      content: language.t('edit'),
      handle: onEdit,
    },
    {
      content: language.t('delete'),
      handle: onDelete,
    },
  ];

  return (
    <Tooltip
      onClose={toggleOpen}
      isVisible={open}
      topAdjustment={
        Platform.OS === 'android' ? -(StatusBar.currentHeight ?? 0) : 0
      }
      placement="bottom"
      closeOnContentInteraction={false}
      backgroundColor="#00000020"
      contentStyle={styles.content}
      tooltipStyle={styles.tooltip}
      content={
        <View>
          {listItemAction.map((item, index) => (
            <ItemAction
              content={item.content}
              handle={item.handle}
              key={index}
            />
          ))}
        </View>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text16Medium,
    color: color.grey_800,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  content: {
    minWidth: 140,
    justifyContent: 'space-around',
    padding: 0,
  },
  tooltip: {
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});
export default PostTooltipController;
