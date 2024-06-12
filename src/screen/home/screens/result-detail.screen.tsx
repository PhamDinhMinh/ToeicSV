import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {THomeStackParamList} from '@/routes/home-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import homeService from '../services/home.services';
import ItemResult from '../components/item-result';
import {IItemResult} from '../services/home.model';
import globalStyles, {color} from '@/global-style';
import {StackActions} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'ResultDetailScreen'>;

const ResultDetailScreen = ({navigation, route}: props) => {
  const {idResult, itemData} = route.params;

  const {data: getResultById} = useQuery({
    queryKey: ['getResultById', idResult],
    queryFn: () =>
      homeService.getResultById({
        id: idResult,
      }),
    enabled: !!idResult,
  });

  const dataObjects = useMemo(
    () =>
      itemData?.details
        ? JSON.parse(itemData?.details)
        : getResultById?.data && JSON.parse(getResultById?.data),
    [getResultById?.data, itemData?.details],
  );

  const renderItem = useCallback(
    ({item, index}: {item: IItemResult; index: number}) => {
      if (getResultById?.examName) {
        switch (index) {
          case 0:
            return (
              <>
                <Text>Part 1: Mô tả hình ảnh</Text>
                <ItemResult
                  itemResult={item}
                  index={index}
                  navigation={navigation}
                />
              </>
            );
          default:
            return (
              <ItemResult
                itemResult={item}
                index={index}
                navigation={navigation}
              />
            );
        }
      } else {
        return (
          <ItemResult itemResult={item} index={index} navigation={navigation} />
        );
      }
    },
    [getResultById?.examName, navigation],
  );

  const renderRight = useCallback(() => {
    return (
      <Pressable
        onPress={() => navigation.dispatch(StackActions.popToTop())}
        style={styles.renderRight}>
        <Text style={styles.textRenderRight}>Thoát</Text>
      </Pressable>
    );
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: getResultById?.examName
        ? getResultById?.examName
        : 'Đáp án chi tiết',
      headerRight: renderRight,
      headerStyle: {},
    });
  }, [getResultById, navigation, renderRight]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataObjects ? dataObjects : []}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => {
          return {length: width, offset: width * index, index};
        }}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 0, margin: 0}}
      />
    </SafeAreaView>
  );
};

export default ResultDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    marginHorizontal: '20%',
    borderRadius: 12,
    marginBottom: 10,
  },
  renderRight: {
    marginRight: 10,
  },
  textRenderRight: {
    ...globalStyles.text16Medium,
    color: color.green_base_400,
  },
});
