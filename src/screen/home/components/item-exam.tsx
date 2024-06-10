import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IResponseExamAll} from '../services/home.model';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/global-style';

const {width} = Dimensions.get('screen');

type TExamToeic = {
  exam: IResponseExamAll;
  navigation: any;
};

const ItemExam = ({exam, navigation}: TExamToeic) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('HomeStack', {
          screen: 'ExamDetailScreen',
          params: {
            idExam: exam.id,
          },
        })
      }>
      <View style={styles.header}>
        <FastImage
          style={styles.imageBanner}
          source={require('@/assets/images/exam-icons.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <Text style={styles.textTitle} numberOfLines={2}>
        {exam.nameExam}
      </Text>
    </Pressable>
  );
};

export default ItemExam;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 0.2 * width,
    marginRight: 20,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 0.2 * width,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 6,
  },
  imageBanner: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textTitle: {
    textAlign: 'center',
    ...globalStyles.text14Regular,
    fontSize: 13,
  },
});
