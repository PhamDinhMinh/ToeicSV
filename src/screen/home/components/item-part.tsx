import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {usePartImage} from '@/hooks/use-icon-part';
import {useTextPart} from '@/hooks/use-text-part';
import globalStyles from '@/global-style';

const {width} = Dimensions.get('screen');

type TItemPart = {
  title: string;
  value: number;
};

const ItemPart = (props: TItemPart) => {
  const {title, value} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FastImage
          style={styles.imageBanner}
          source={usePartImage(value)}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <Text style={styles.textPart}>{useTextPart(value)}</Text>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
};

export default ItemPart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 0.2 * width,
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
  textPart: {
    textAlign: 'center',
    ...globalStyles.text15Medium,
    marginHorizontal: 4,
  },
  textTitle: {
    textAlign: 'center',
    ...globalStyles.text14Regular,
    fontSize: 13,
  },
});
