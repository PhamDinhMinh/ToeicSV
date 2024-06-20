import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IRank} from '../services/statistic.model';
import globalStyles from '@/global-style';

const ItemHightRank = ({
  item,
  height,
  width,
  imageUrl,
}: {
  item: IRank;
  height: number;
  width: number;
  imageUrl: any;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'relative',
        }}>
        <FastImage
          style={[styles.imageRank, {height: height, width: width}]}
          source={imageUrl}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Text style={{marginTop: 10, marginBottom: 5}}>
        {item?.accuracyRate.toFixed(2) * 100}%
      </Text>
      <Text style={styles.textName} numberOfLines={1}>
        {item?.userName}
      </Text>
    </View>
  );
};

export default ItemHightRank;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  imageRank: {
    borderRadius: 600,
  },
  textName: {
    ...globalStyles.text16Medium,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
