import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {color} from '@/global-style';
import {IGrammarResponse} from '../services/grammar.model';
import {Icon} from '@rneui/themed';

type TItemGrammar = {
  item: IGrammarResponse;
  index: number;
  navigation: any;
};
const ItemGrammar = (props: TItemGrammar) => {
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
        navigation.navigate('GrammarDetailScreen', {item: item});
      }}>
      <View style={styles.groupLeft}>
        <View style={styles.boxIndex}>
          <Text style={styles.indexBox}>{index + 1}</Text>
        </View>
        <Text style={styles.textTitle}>{item?.title}</Text>
      </View>
      {item?.isWatched && (
        <Icon
          name="checkmark-circle-sharp"
          type="ionicon"
          color={color.green_400}
        />
      )}
    </Pressable>
  );
};

export default ItemGrammar;

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
