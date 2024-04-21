import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

type TMultiImages = {
  images: string[];
  toggleOverlay: (i: number) => void;
  goToFullView?: any;
};

const MultiImages = (props: TMultiImages) => {
  const {images, toggleOverlay, goToFullView} = props;

  return (
    <View style={styles.container}>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 1.5}}
        onPress={() => toggleOverlay(0)}>
        <FastImage
          source={{uri: images[0]}}
          style={{
            width: '100%',
            aspectRatio: 1 / 1.5,
            borderRadius: 10,
          }}
        />
      </Pressable>
      <View
        style={{
          width: '49%',
          aspectRatio: 1 / 1.5,
          justifyContent: 'space-between',
        }}>
        <Pressable style={{width: '100%', height: '49%'}}>
          <FastImage
            source={{uri: images[1]}}
            style={{
              width: '100%',
              aspectRatio: 1 / (0.75 * 0.98),
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            if (!goToFullView) {
              toggleOverlay(0);
            } else {
              goToFullView();
            }
          }}
          style={{
            width: '100%',
            height: '49%',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <View style={styles.viewText}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              +{images.length - 2}
            </Text>
          </View>
          <FastImage
            source={{uri: images[2]}}
            style={{
              width: '100%',
              aspectRatio: 1 / (0.75 * 0.98),
              borderRadius: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default MultiImages;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewText: {
    position: 'absolute',
    backgroundColor: '#00000090',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
