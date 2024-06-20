import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import globalStyles from '@/global-style';
import moment from 'moment';
import {IResponseResultHistory} from '../services/statistic.model';

const ItemHistory = ({
  index,
  item,
  navigation,
}: {
  index: number;
  item: IResponseResultHistory;
  navigation: any;
}) => {
  const [background, setBackground] = useState('white');

  const handlePress = useCallback(() => {
    navigation.navigate('HomeStack', {
      screen: 'ResultDetailScreen',
      params: {
        idResult: item?.id,
      },
    });
  }, [item, navigation]);

  const handlePressIn = () => {
    setBackground('#eee');
  };

  const handlePressOut = () => {
    setBackground('white');
  };

  return (
    <Pressable
      style={[styles.group, {backgroundColor: background}]}
      onPress={handlePress}
      onPressOut={handlePressOut}
      onPressIn={handlePressIn}>
      <View style={styles.boxIndex}>
        <Text style={styles.indexBox}>{index + 1}</Text>
      </View>
      <View>
        <Text style={styles.textTitle}>Thi thử lần {index + 1}</Text>
        <Text>
          Thi vào lúc {moment(item?.timeEnd).format('DD/MM/YYYY HH:MM')}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
  },
  boxIndex: {
    borderRadius: 10,
    backgroundColor: '#CCC',
    marginRight: 10,
  },
  indexBox: {
    ...globalStyles.text16Medium,
    color: 'white',
    width: 40,
    lineHeight: 40,
    height: 40,
    textAlign: 'center',
  },
  textTitle: {
    ...globalStyles.text16Regular,
  },
});
