import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useId} from 'react';
import {useQuery} from '@tanstack/react-query';
import statisticService from '../services/statistic.services';
import globalStyles, {color} from '@/global-style';
import {IRank, IResponseResultHistory} from '../services/statistic.model';
import ItemHistory from '../components/item-history';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {TMyTabsParamsList} from '@/routes/my-tabs';
import {TMainStackParamList} from '@/routes/main-stack';
import ItemRank from '../components/item-rank';

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'Statistics'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const StatisticsScreen = ({navigation}: props) => {
  const uid = useId();

  const {data: getHistoryForUser} = useQuery({
    queryKey: ['getHistoryForUser'],
    queryFn: () =>
      statisticService.getHistoryForUser({
        skipCount: 0,
        maxResultCount: 2,
      }),
  });

  const {data: getRanks} = useQuery({
    queryKey: ['getRanks'],
    queryFn: () =>
      statisticService.getRank({
        skipCount: 0,
        maxResultCount: 3,
      }),
  });

  const handlePressGoAll = useCallback(() => {
    navigation.navigate('StatisticsStack', {
      screen: 'HistoryAllScreen',
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({item, index}: {item: IResponseResultHistory; index: number}) => {
      return (
        <ItemHistory
          item={item}
          index={index}
          key={index + 'history' + uid}
          navigation={navigation}
        />
      );
    },
    [navigation, uid],
  );

  const renderRank = useCallback(
    ({item, index}: {item: IRank; index: number}) => {
      return <ItemRank item={item} index={index} />;
    },
    [],
  );
  const handleGoToRank = useCallback(() => {
    navigation.navigate('StatisticsStack', {
      screen: 'RankScreen',
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={styles.viewHistory}>
        <Text style={styles.titleHistory}>Bảng xếp hạng</Text>
        <FlatList
          data={getRanks ? getRanks?.data : []}
          renderItem={renderRank}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 10, margin: 0}}
          ListEmptyComponent={
            <View>
              <Text style={{textAlign: 'center', lineHeight: 50}}>
                Chưa có xếp hạng!
              </Text>
            </View>
          }
        />
        <Pressable onPress={handleGoToRank}>
          <Text style={styles.titleFooter}>Xem tất cả</Text>
        </Pressable>
      </View>
      <View style={[styles.viewHistory, {marginTop: 20}]}>
        <Text style={styles.titleHistory}>Lịch sử</Text>
        <FlatList
          data={getHistoryForUser ? getHistoryForUser?.data : []}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 10, margin: 0}}
          ListEmptyComponent={
            <View>
              <Text style={{textAlign: 'center', lineHeight: 50}}>
                Chưa có kết quả nào được lưu!
              </Text>
            </View>
          }
        />
        <Pressable onPress={handlePressGoAll}>
          <Text style={styles.titleFooter}>Xem tất cả</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  viewHistory: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
  },
  titleHistory: {
    ...globalStyles.text16Medium,
  },
  titleFooter: {
    ...globalStyles.text15Medium,
    color: color.green_base_400,
    textAlign: 'right',
  },
});
