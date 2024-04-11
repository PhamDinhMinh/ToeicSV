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

type TPostTooltipController = {
  toggleOpen: () => void;
  open: any;
  post: IPostResponse;
  navigation: any;
};
const PostTooltipController = ({
  toggleOpen = () => {},
  open,
  ...props
}: React.ComponentProps<typeof Tooltip> & TPostTooltipController) => {
  const onEdit = () => {};
  const language = useTranslation();

  const onDelete = () => {};

  const [backgroundItem, setBackgroundItem] = useState('white');

  const handlePressIn = () => {
    setBackgroundItem('#00000020');
  };

  const handlePressOut = () => {
    setBackgroundItem('white');
  };

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
          <Pressable
            onPress={onEdit}
            style={[styles.button, {backgroundColor: backgroundItem}]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={styles.text}>{language.t('edit')}</Text>
          </Pressable>
          <Pressable
            onPress={onDelete}
            style={[styles.button, {backgroundColor: backgroundItem}]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={styles.text}>{language.t('delete')}</Text>
          </Pressable>
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
