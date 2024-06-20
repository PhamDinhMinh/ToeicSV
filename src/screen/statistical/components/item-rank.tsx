import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IRank} from '../services/statistic.model';
import globalStyles, {color} from '@/global-style';
import FastImage from 'react-native-fast-image';
import {Badge} from '@rneui/themed';
import useAvatarDefault from '@/stores/avatar.store';

const ItemRank = ({item}: {index: number; item: IRank}) => {
  const avatarDefault = useAvatarDefault((state: any) => state?.avatarDefault);

  return (
    <Pressable style={styles.group}>
      <View style={styles.groupInfo}>
        <View style={styles.boxIndex}>
          {item?.rank > 3 && (
            <View>
              <Badge
                status="success"
                value={item?.rank}
                containerStyle={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  zIndex: 300,
                }}
              />
              <FastImage
                style={styles.imageRank}
                source={{uri: item?.avatar ?? avatarDefault}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
          {item?.rank === 1 && (
            <FastImage
              style={styles.imageRank}
              source={require('@/assets/images/rank/rank1.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {item?.rank === 2 && (
            <FastImage
              style={styles.imageRank}
              source={require('@/assets/images/rank/rank2.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {item?.rank === 3 && (
            <FastImage
              style={styles.imageRank}
              source={require('@/assets/images/rank/rank3.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </View>
        <View>
          <Text style={styles.textTitle}>{item?.userName}</Text>
        </View>
      </View>
      <Text>
        {item?.totalQuestionsAttempted} câu -{' '}
        {(item?.accuracyRate * 100).toFixed(0)}%
      </Text>
    </Pressable>
  );
};

export default ItemRank;

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIndex: {
    borderRadius: 10,
    backgroundColor: '#CCC',
    marginRight: 10,
    border: 1,
    width: 40,
    lineHeight: 40,
    height: 40,
    borderColor: color.green_base_400,
    borderStyle: 'solid',
  },
  indexBox: {
    ...globalStyles.text16Medium,
    color: 'white',
    width: 40,
    lineHeight: 40,
    height: 40,
    textAlign: 'center',
  },
  imageRank: {
    width: 40,
    lineHeight: 40,
    height: 40,
    borderRadius: 10,
  },
  textTitle: {
    ...globalStyles.text16Regular,
  },
});
