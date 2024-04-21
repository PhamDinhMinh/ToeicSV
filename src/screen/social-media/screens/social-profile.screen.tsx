import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import globalStyles, {color} from '@/global-style';
import {useInfiniteQuery} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderProfile from '../components/header-profile';
import {IPostResponse} from '../services/social-media.model';
import SocialPostItem from '../components/social-post-item';
import {Icon} from '@rneui/base';
import {SafeAreaView} from 'react-native';

type props = StackScreenProps<
  TSocialMediaStackParamList,
  'SocialProfileScreen'
>;

const SocialProfileScreen = ({route, navigation}: props) => {
  const {userId} = route.params;
  const language = useTranslation();

  const {
    data: getListPost,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['list-post-user', userId],
    queryFn: () =>
      socialMediaService.getAllPostUser({
        userId: userId,
        skipCount: 0,
        maxResultCount: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage?.data?.length <
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
    initialPageParam: {skipCount: 0, maxResultCount: 10},
  });

  const onRefresh = () => {
    refetch();
  };

  const dataProvider = useMemo(() => {
    return getListPost?.pages.map(page => page?.data).flat() ?? [];
  }, [getListPost?.pages]);

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const headerProfile = useCallback(() => {
    return <HeaderProfile userId={userId} />;
  }, [userId]);

  const renderItem = useCallback(
    ({item, index}: {item: IPostResponse; index: number}) => {
      return (
        <View style={{width: '100%'}} key={index}>
          <SocialPostItem post={item} navigation={navigation} />
        </View>
      );
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.viewBack} onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          type="ionicon"
          color="white"
          size={24}
          style={styles.iconBack}
        />
      </Pressable>
      <FlatList
        maxToRenderPerBatch={20}
        data={dataProvider}
        renderItem={renderItem}
        onEndReached={onEndReached}
        refreshing={isLoading}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListHeaderComponent={headerProfile}
        ListEmptyComponent={
          isLoading ? undefined : (
            <Text style={styles.text}>{language.t('none-post')}</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default SocialProfileScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  viewBack: {
    padding: 2,
    backgroundColor: '#E0E0E0',
    borderRadius: 200,
    position: 'absolute',
    zIndex: 20,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 70,
    left: 10,
  },
  iconBack: {},
  text: {
    ...globalStyles.text17Medium,
    color: color.grey_500,
    textAlign: 'center',
    marginTop: '50%',
  },
});
