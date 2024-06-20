import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useId, useMemo} from 'react';
import statisticService from '../services/statistic.services';
import {useInfiniteQuery} from '@tanstack/react-query';
import {IRank} from '../services/statistic.model';
import ItemRank from '../components/item-rank';
import ItemHightRank from '../components/item-rank-height';
import {Divider} from '@rneui/base';

const RankScreen = () => {
  const uid = useId();

  const {
    data: getListRank,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['list-rank-toeic'],
    queryFn: ({pageParam}) => statisticService.getRank(pageParam),
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
    return getListRank?.pages.map(page => page?.data).flat() ?? [];
  }, [getListRank?.pages]);

  const onRefresh = () => {
    refetch();
  };

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const renderRank = useCallback(
    ({item, index}: {item: IRank; index: number}) => {
      if (item?.rank > 3) {
        return (
          <View key={index + 'rank' + uid}>
            <ItemRank item={item} index={index} />
            <Divider />
          </View>
        );
      }
      return <View />;
    },
    [uid],
  );

  return (
    <SafeAreaView style={styles.container}>
      {dataProvider?.length >= 3 && (
        <View style={styles.viewRankTop}>
          <ItemHightRank
            item={dataProvider[1]}
            height={70}
            width={70}
            imageUrl={require('@/assets/images/rank/rank_2.png')}
          />
          <ItemHightRank
            item={dataProvider[0]}
            height={100}
            width={100}
            imageUrl={require('@/assets/images/rank/rank_1.png')}
          />
          <ItemHightRank
            item={dataProvider[2]}
            height={70}
            width={70}
            imageUrl={require('@/assets/images/rank/rank_3.png')}
          />
        </View>
      )}
      <Divider style={{marginHorizontal: 10}} />
      <FlatList
        data={dataProvider ? dataProvider : []}
        renderItem={renderRank}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View>
            <Text style={{textAlign: 'center', lineHeight: 50}}>
              Chưa có xếp hạng!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default RankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewRankTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
});
