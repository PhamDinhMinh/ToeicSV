import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@/global-style';
import {IExamTipsResponse} from '../services/exam-tips.model';

type TItemExamTips = {
  item: IExamTipsResponse;
  index: number;
  navigation: any;
};
const ItemExamTips = (props: TItemExamTips) => {
  const {item, index, navigation} = props;
  const [backgroundItem, setBackgroundItem] = useState('white');

  const handlePressIn = () => {
    setBackgroundItem('#E0E0E0');
  };

  const handlePressOut = () => {
    setBackgroundItem('white');
  };

  return (
    <Pressable
      style={[styles.container, {backgroundColor: backgroundItem}]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        navigation.navigate('ExamTipsDetailScreen', {item: item});
      }}>
      <View style={styles.groupLeft}>
        <View style={styles.boxIndex}>
          <Text style={styles.indexBox}>{index + 1}</Text>
        </View>
        <Text style={styles.textTitle}>{item?.title}</Text>
      </View>
    </Pressable>
  );
};

export default ItemExamTips;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  groupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
