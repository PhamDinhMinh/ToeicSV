import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {TMainStackParamList} from '@/routes/main-stack';
import {TMyTabsParamsList} from '@/routes/my-tabs';
import SocialMediaHeader from '../components/social-media-header';
import {useInfiniteQuery} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import {IPostResponse} from '../services/social-media.model';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';
import SocialPostItem from '../components/social-post-item';

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'SocialMedia'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const SocialMediaScreen = ({navigation}: props) => {
  const language = useTranslation();

  const {
    data: getListPost,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['list-post'],
    queryFn: () =>
      socialMediaService.getAllPost({
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
    <View style={styles.container}>
      <SocialMediaHeader navigation={navigation} />
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
        ListEmptyComponent={
          isLoading ? undefined : (
            <Text style={styles.text}>{language.t('none-post')}</Text>
          )
        }
      />
    </View>
  );
};

export default SocialMediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F8',
  },
  text: {
    ...globalStyles.text17Medium,
    textAlign: 'center',
    marginTop: '50%',
  },
});
