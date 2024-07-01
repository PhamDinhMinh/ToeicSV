import {getCachedNetworkImageSize} from '@/utils/images/image';
import {faker} from '@faker-js/faker';
import React, {memo, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import FastImage, {ResizeMode} from 'react-native-fast-image';

type TSingleImage = {
  image: string;
  toggleOverlay: (index: number) => void;
  style?: any;
  resizeMode?: ResizeMode;
  thumbnail?: boolean;
};

const SingleImage = ({
  image,
  toggleOverlay,
  style,
  resizeMode,
  thumbnail,
}: TSingleImage) => {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  useEffect(() => {
    getCachedNetworkImageSize({
      imageUrl: image,
      onSuccess: result => {
        setAspectRatio(result.width / result.height);
      },
    });
  }, [image]);

  return (
    <View style={[{width: '100%', aspectRatio: aspectRatio ?? 1}, style]}>
      <Pressable onPress={() => toggleOverlay(0)}>
        <FastImage
          key={faker.string.uuid()}
          resizeMode={resizeMode ?? 'contain'}
          source={{uri: image}}
          style={{
            width: '100%',
            aspectRatio: thumbnail ? 1.5 : aspectRatio ?? 1.5,
            borderRadius: 10,
          }}
        />
      </Pressable>
    </View>
  );
};

export default memo(SingleImage);
