import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
} from 'react-native';
import React, {useCallback, useId, useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TStatisticsStackParamList} from '@/routes/statistics-stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import statisticService from '../services/statistic.services';
import ItemHistory from '../components/item-history';
import {IResponseResultHistory} from '../services/statistic.model';
import globalStyles from '@/global-style';

type props = StackScreenProps<TStatisticsStackParamList, 'HistoryAllScreen'>;

const HistoryAllScreen = ({navigation}: props) => {
  const uid = useId();

  const {
    data: getListHistory,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['list-history-exam'],
    queryFn: ({pageParam}) => statisticService.getHistoryForUser(pageParam),
    getNextPageParam: (lastPage, allPages, lastPageParams) => {
      const skipCount = allPages.length * lastPageParams.maxResultCount;
      return (allPages.length - 1) * lastPageParams.maxResultCount +
        lastPage.data.length !==
        lastPage.totalRecords
        ? {
            ...lastPageParams,
            skipCount: skipCount,
          }
        : undefined;
    },
    initialPageParam: {skipCount: 0, maxResultCount: 15},
  });

  const dataProvider = useMemo(() => {
    return getListHistory?.pages.map(page => page?.data).flat() ?? [];
  }, [getListHistory?.pages]);

  const renderItem = useCallback(
    ({item, index}: {item: IResponseResultHistory; index: number}) => {
      return (
        <View key={index + 'history' + uid} style={{marginBottom: 10}}>
          <ItemHistory item={item} index={index} navigation={navigation} />
        </View>
      );
    },
    [navigation, uid],
  );

  const onRefresh = () => {
    refetch();
  };

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        maxToRenderPerBatch={20}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        data={dataProvider}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          isLoading ? undefined : (
            <Text style={styles.text}>Bạn chưa thi lần nào!</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default HistoryAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    ...globalStyles.text17Medium,
    textAlign: 'center',
    marginTop: '50%',
  },
});
