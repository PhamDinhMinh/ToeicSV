import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {TDocumentStackParamList} from '@/routes/documents-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import examTipsService from './services/exam-tips.service';
import {IExamTipsResponse} from './services/exam-tips.model';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';
import ItemExamTips from './components/item-exam-tips';

type props = StackScreenProps<TDocumentStackParamList, 'ExamTipScreen'>;

const ExamTipScreen = ({navigation}: props) => {
  const language = useTranslation();

  const {
    data: getListExamTips,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['list-exam-tips'],
    queryFn: () =>
      examTipsService.getAll({
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
    return getListExamTips?.pages.map(page => page?.data).flat() ?? [];
  }, [getListExamTips?.pages]);

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({item, index}: {item: IExamTipsResponse; index: number}) => {
      return <ItemExamTips index={index} item={item} navigation={navigation} />;
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.text}>{language.t('none-exam-tips')}</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default ExamTipScreen;

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
