import React, {memo, useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {IPostResponse} from '../services/social-media.model';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';
import HeaderSocialPostItem from './header-post-item';

const width = Dimensions.get('screen').width;

type TSocialPostItem = {
  post: IPostResponse;
  navigation?: any;
  isViewPost?: boolean;
  isVisible?: boolean;
};

const SocialPostItem = (props: TSocialPostItem) => {
  const {post, navigation, isViewPost = false, isVisible = true} = props;

  const lastItemId = useRef(post.id);
  const language = useTranslation();

  const [visibleOptions, setVisibleOptions] = useState(false);

  const toggleOptions = useCallback(() => {
    setVisibleOptions(!visibleOptions);
  }, [visibleOptions]);

  return (
    <View style={styles.container}>
      <HeaderSocialPostItem
        post={post}
        visibleOptions={visibleOptions}
        toggleOptions={toggleOptions}
        navigation={navigation}
      />
    </View>
  );
};

export default memo(SocialPostItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: width < 440 ? 0 : 10,
    // paddingTop: 5,
    // paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 5,
  },

  textName: {
    ...globalStyles.text17Bold,
    color: '#000',
  },

  textContent: {
    ...globalStyles.text17Medium,
    color: '#000',
  },
  textButton: {
    ...globalStyles.text15SemiBold,
    color: '#65676B',
    marginVertical: 5,
    fontWeight: '400',
    lineHeight: 18,
  },

  footerWaiting: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  textTittleWaiting: {
    ...globalStyles.text17Bold,
    color: '#000',
  },
});
