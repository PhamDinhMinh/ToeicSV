import {
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {ETypeGrammar, IGrammarResponse} from './services/grammar.model';
import grammarService from './services/grammar.service';
import {useInfiniteQuery} from '@tanstack/react-query';
import globalStyles from '@/global-style';
import ItemGrammar from './components/item-grammar';
import {StackScreenProps} from '@react-navigation/stack';
import {TDocumentStackParamList} from '@/routes/documents-stack';

type props = StackScreenProps<TDocumentStackParamList, 'GrammarScreen'>;

const GrammarScreen = ({navigation}: props) => {
  const {
    data: getListGrammar,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['list-grammar'],
    queryFn: () =>
      grammarService.getAll({
        type: ETypeGrammar.Basic,
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

  const onRefresh = () => {};

  const dataProvider = useMemo(() => {
    return getListGrammar?.pages.map(page => page?.data).flat() ?? [];
  }, [getListGrammar?.pages]);

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({item, index}: {item: IGrammarResponse; index: number}) => {
      return <ItemGrammar item={item} index={index} navigation={navigation} />;
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
            <Text style={styles.text}>Không có bài ngữ pháp nào</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default GrammarScreen;

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
