import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Avatar, Icon} from '@rneui/themed';
import moment from 'moment';
import {IPostResponse} from '../services/social-media.model';
import useAccountStore from '@/stores/account.store';
import useAvatarDefault from '@/stores/avatar.store';
import globalStyles from '@/global-style';
import PostTooltipController from './post-tooltip-controller';

type THeaderSocialPostItem = {
  post: IPostResponse;
  toggleOptions: () => void;
  visibleOptions: any;
  navigation: any;
};

const HeaderSocialPostItem = (props: THeaderSocialPostItem) => {
  const {post, toggleOptions, visibleOptions, navigation} = props;
  const userInformation = useAccountStore(state => state?.account);
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);

  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(
      () => {
        setNow(moment());
      },
      moment().diff(post.creationTime) < 1000 * 60 * 60
        ? 1000 * 60 * 60
        : 60000,
    );
    return () => {
      clearInterval(interval);
    };
  }, [post.creationTime]);

  const timestamp = useMemo(() => {
    const creationTime = moment(post.creationTime);
    if (-moment(post.creationTime).diff(now) > 60 * 60 * 24 * 1000) {
      return creationTime.format('HH:mm DD/MM/YYYY');
    }
    return creationTime.from(now);
  }, [now, post.creationTime]);

  const imageAvatarUrl = useMemo(
    () =>
      post.user.id === userInformation?.id
        ? userInformation?.imageUrl
        : post?.user?.imageUrl,
    [
      post.user.id,
      post.user?.imageUrl,
      userInformation?.id,
      userInformation?.imageUrl,
    ],
  );

  const avatarUrl = useMemo(
    () =>
      imageAvatarUrl !== '' && imageAvatarUrl !== null
        ? imageAvatarUrl
        : avatarDefault,
    [avatarDefault, imageAvatarUrl],
  );

  const goToViewPost = useCallback(() => {}, []);

  const goToProfile = () => {};

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.groupInfo, {width: '80%'}]}
        onPress={goToViewPost}>
        <Avatar
          onPress={goToProfile}
          rounded
          size={50}
          source={{
            uri: avatarUrl,
          }}
          // ImageComponent={renderImageComponent}
        />
        <View style={{marginLeft: 16, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text onPress={goToProfile} style={[styles.textName]}>
                {post?.user?.name?.replace(/^\s+/, '')}
              </Text>
            </View>
          </View>
          <Text style={[styles.textContent]}>{timestamp}</Text>
        </View>
      </Pressable>
      {userInformation?.id === post?.user?.id && (
        <View style={{}}>
          <PostTooltipController
            toggleOpen={toggleOptions}
            open={visibleOptions}
            post={post}
            navigation={navigation}>
            <Icon
              type="ionicon"
              name="ellipsis-horizontal"
              iconStyle={{
                padding: 5,
              }}
              onPress={toggleOptions}
            />
          </PostTooltipController>
        </View>
      )}
    </View>
  );
};

export default memo(HeaderSocialPostItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 10,
    // alignItems: 'center',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textName: {
    ...globalStyles.text17Bold,
    color: '#000',
  },

  textDesEmoji: {
    ...globalStyles.text17Medium,
  },

  textContent: {
    ...globalStyles.text14Medium,
    fontWeight: '400',
  },
});
