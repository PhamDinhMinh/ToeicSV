import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Avatar, Icon} from '@rneui/themed';
import moment from 'moment';
import {IPostResponse} from '../services/social-media.model';
import useAccountStore from '@/stores/account.store';
import useAvatarDefault from '@/stores/avatar.store';
import globalStyles from '@/global-style';
import PostTooltipController from './post-tooltip-controller';
import ActionDeleteModal from '@/screen/components/action-delete-modal';
import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';
import FeelEmotions from './feeling-emotions/feeling-emotions';

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
  const language = useTranslation();
  const queryClient = useQueryClient();

  const [modalConfirm, setModalConfirm] = useState<boolean>(false);

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

  const {mutate: deletePost, isPending: isPendingDelete} = useMutation({
    mutationFn: () => socialMediaService.deletePost({id: post?.id}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: language.t('delete-post-success'),
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
      });
      queryClient.refetchQueries({queryKey: ['list-post']});
      queryClient.refetchQueries({
        queryKey: ['list-post-user', post?.user?.id],
      });
    },
    onError: (err: any) => {
      return Toast.show({
        type: 'error',
        text1: err?.data,
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
      });
    },
  });

  const goToProfile = useCallback(() => {
    navigation.navigate('SocialMediaStack', {
      screen: 'SocialProfileScreen',
      params: {userId: post?.user?.id},
    });
  }, [navigation, post]);

  const goToPostDetail = useCallback(() => {
    navigation.navigate('SocialMediaStack', {
      screen: 'PostDetailScreen',
      params: {postId: post?.id},
    });
  }, [navigation, post?.id]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.groupInfo, {width: '80%'}]}
        onPress={goToPostDetail}>
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
            <Text onPress={goToProfile} style={[styles.textName]}>
              {post?.user?.name?.replace(/^\s+/, '')}
            </Text>
            {post.emotionId !== null && (
              <Text style={styles.textDesEmoji}>{language.t('progress')}</Text>
            )}
            {post.emotionId !== null && (
              <FastImage
                source={{
                  uri:
                    post.emotionId !== null &&
                    FeelEmotions[post.emotionId]?.icon
                      ? FeelEmotions[post.emotionId]?.icon
                      : '',
                }}
                style={{width: 24, height: 24}}
              />
            )}
            {post.emotionId !== null && (
              <Text style={styles.textDesEmoji}>{language.t('feel')}</Text>
            )}
            {post.emotionId !== null && (
              <Text style={styles.textDesEmoji}>
                {language.t(FeelEmotions[post.emotionId]?.des)}{' '}
              </Text>
            )}
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
            setModalConfirm={setModalConfirm}
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

      <ActionDeleteModal
        modalConfirm={modalConfirm}
        handle={deletePost}
        setModalConfirm={setModalConfirm}
        content={language.t('confirm-delete-post')}
        isPending={isPendingDelete}
      />
    </View>
  );
};

export default memo(HeaderSocialPostItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
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
