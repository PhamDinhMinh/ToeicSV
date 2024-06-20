import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useId} from 'react';
import globalStyles, {color} from '@/global-style';
import {IItemResult} from '../services/home.model';

type TItemResult = {
  index: number;
  itemResult: IItemResult;
  navigation: any;
};

const ItemResult = (props: TItemResult) => {
  const {index, itemResult, navigation} = props;
  const uid = useId();

  return (
    <View style={styles.container}>
      <Text style={styles.textQuestion}>
        Câu <Text style={{fontWeight: '600'}}>{index + 1}</Text>
      </Text>
      <View style={styles.answersView}>
        {itemResult &&
          itemResult?.AnswersQuestion?.map((answer, indexA) => (
            <View
              key={indexA + 'answers' + uid}
              style={[
                styles.viewSelect,
                {
                  backgroundColor:
                    answer.Id === itemResult?.Answer?.Id
                      ? itemResult?.Answer?.IsBoolean
                        ? color.green_base_500
                        : color.red_300
                      : 'white',
                },
              ]}>
              <Text
                style={{
                  color:
                    answer.Id === itemResult?.Answer?.Id
                      ? itemResult?.Answer?.IsBoolean
                        ? 'white'
                        : 'white'
                      : 'black',
                }}>
                {String.fromCharCode(65 + indexA)}
              </Text>
            </View>
          ))}
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('QuestionResultDetailScreen', {
            idQuestion: itemResult?.Id,
            idAnswers: itemResult?.Answer?.Id,
            isBoolean: itemResult?.Answer?.IsBoolean,
          })
        }>
        <Text>Xem chi tiết</Text>
      </Pressable>
    </View>
  );
};

export default ItemResult;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textQuestion: {
    ...globalStyles.text16Regular,
  },
  viewSelect: {
    width: 36,
    height: 36,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: color.grey_300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
});
