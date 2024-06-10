import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback, useId, useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {THomeStackParamList} from '@/routes/home-stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import homeService from '../services/home.services';
import {IResponseExamAll} from '../services/home.model';
import globalStyles from '@/global-style';
import ItemExamVertical from '../components/item-exam-vertical';

type props = StackScreenProps<THomeStackParamList, 'ExamListScreen'>;

const ExamListScreen = ({navigation}: props) => {
  const uid = useId();

  const {
    data: getListExamToeic,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['list-exam-toeic'],
    queryFn: ({pageParam}) => homeService.getAllExam(pageParam),
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
    initialPageParam: {skipCount: 0, maxResultCount: 10},
  });

  const dataProvider = useMemo(() => {
    return getListExamToeic?.pages.map(page => page?.data).flat() ?? [];
  }, [getListExamToeic?.pages]);

  const renderItem = useCallback(
    ({item, index}: {item: IResponseExamAll; index: number}) => {
      return (
        <ItemExamVertical
          exam={item}
          key={index + 'exam' + uid}
          navigation={navigation}
        />
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
          paddingVertical: 5,
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
            <Text style={styles.text}>Không có đề thi</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default ExamListScreen;

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
