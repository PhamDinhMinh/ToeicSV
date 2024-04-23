import {
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {IGrammarResponse} from './services/grammar.model';
import grammarService from './services/grammar.service';
import {useInfiniteQuery} from '@tanstack/react-query';
import globalStyles from '@/global-style';
import ItemGrammar from './components/item-grammar';
import {StackNavigationProp} from '@react-navigation/stack';
import {TDocumentStackParamList} from '@/routes/documents-stack';
import {useTranslation} from 'react-i18next';
import {CompositeNavigationProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {TGrammarTabParamList} from '@/routes/tab/grammar.tab';

type props = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TGrammarTabParamList,
      'GrammarAdvanceScreen' | 'GrammarBasicScreen'
    >,
    StackNavigationProp<TDocumentStackParamList, 'GrammarTab'>
  >;
  route: any;
};

const GrammarScreen = ({navigation, route}: props) => {
  const {type} = route.params;
  const language = useTranslation();

  const {
    data: getListGrammar,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['list-grammar', type],
    queryFn: () =>
      grammarService.getAll({
        type: type,
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
            <Text style={styles.text}>{language.t('none-grammar')}</Text>
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
