import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import {useTranslation} from 'react-i18next';
import useAvatarDefault from '@/stores/avatar.store';
import socialMediaService from '../services/social-media.service';
import globalStyles, {color} from '@/global-style';
import listEmoji from '../components/react/list-emoji';
import {useQuery} from '@tanstack/react-query';
import {IReactResponse} from '../services/social-media.model';

type props = StackScreenProps<
  TSocialMediaStackParamList,
  'SocialListLikeScreen'
>;

const SocialListLikeScreen = ({route, navigation}: props) => {
  const {postId, commentId} = route.params;
  const language = useTranslation();

  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);

  const {
    data: getListReact,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['list-react-post', [postId, commentId]],
    queryFn: () =>
      socialMediaService.getAllReact({
        maxResultCount: 80,
        skipCount: 0,
        postId: postId,
        commentId: commentId,
      }),
  });

  const renderItem = ({item}: {item: IReactResponse}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('SocialProfileScreen', {
            userId: item?.creatorUserId,
          });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomColor: '#f0f0f0',
          borderBottomWidth: 1,
        }}>
        <View style={{position: 'relative'}}>
          <Avatar
            source={{
              uri: item?.user?.imageUrl ?? avatarDefault,
            }}
            rounded
            size={40}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -6,
              right: -6,
              borderRadius: 50,
            }}>
            {listEmoji[item?.reactState]?.emoji({width: 24, height: 24})}
          </View>
        </View>
        <View>
          <Text style={[styles.text, {marginLeft: 10}]}>
            {item?.user?.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getListReact?.data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        ListEmptyComponent={
          <Text
            style={[
              styles.text,
              {
                textAlign: 'center',
                marginTop: '50%',
              },
            ]}>
            {language.t('not-reaction')}
          </Text>
        }
      />
    </View>
  );
};

export default SocialListLikeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: '100%',
  },

  text: {
    ...globalStyles.text16Medium,
    color: color.grey_500,
  },
});
