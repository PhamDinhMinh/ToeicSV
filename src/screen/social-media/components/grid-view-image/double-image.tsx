import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {faker} from '@faker-js/faker';

type TDoubleImages = {
  images: string[];
  toggleOverlay: (i: number) => void;
  resizeMode?: ResizeMode;
};

const DoubleImages = ({images, toggleOverlay}: TDoubleImages) => {
  return (
    <View style={styles.container}>
      {images.map((itemPath, index) => (
        <Pressable
          style={{width: '49%', aspectRatio: 1 / 1.5}}
          key={faker.string.uuid()}>
          <Pressable onPress={() => toggleOverlay(index)}>
            <FastImage
              source={{uri: itemPath}}
              style={{
                width: '100%',
                aspectRatio: 1 / 1.5,
                borderRadius: 10,
              }}
            />
          </Pressable>
        </Pressable>
      ))}
    </View>
  );
};

export default DoubleImages;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
