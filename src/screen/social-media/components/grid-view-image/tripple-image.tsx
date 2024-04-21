import {Pressable, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

type TTripleImages = {
  images: string[];
  toggleOverlay: (i: number) => void;
};

const TripleImages = ({images, toggleOverlay}: TTripleImages) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 2}}
        onPress={() => toggleOverlay(0)}>
        <FastImage
          source={{uri: images[0]}}
          style={{
            width: '100%',
            aspectRatio: 1 / 2,
            borderRadius: 10,
          }}
        />
      </Pressable>
      <View
        style={{
          width: '49%',
          aspectRatio: 1 / 2,
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={() => toggleOverlay(1)}>
          <FastImage
            source={{uri: images[1]}}
            style={{
              width: '100%',
              aspectRatio: 1 / 0.98,
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Pressable
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => toggleOverlay(2)}>
          <FastImage
            source={{uri: images[2]}}
            style={{
              width: '100%',
              aspectRatio: 1 / 0.98,
              borderRadius: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TripleImages;
