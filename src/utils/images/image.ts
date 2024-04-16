import ImageResizer from '@bam.tech/react-native-image-resizer';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Image as ImageComponent} from 'react-native';
import {Platform} from 'react-native';
import {Image} from 'react-native-image-crop-picker';

export type TPickedImage = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
  source: string;
  path?: string;
};

export const getImageObjectFromPicker = (image: Image): TPickedImage => {
  return {
    uri: image.path,
    width: image.width,
    height: image.height,
    type: image.mime,
    size: image.size,
    name:
      (Platform.OS === 'ios' && image.filename
        ? image.filename
        : image.path.substring(image.path.lastIndexOf('/') + 1)) ?? '',
    source: image.sourceURL ? image.sourceURL : image.path,
  };
};

export const compressImage = async (image: TPickedImage) => {
  const imageRatio = image.width / image.height;
  let width;
  let height;
  if (image.width > 3000 || image.height > 3000) {
    if (image.width > image.height) {
      width = 3000;
      height = 3000 / imageRatio;
    } else {
      height = 3000;
      width = 3000 * imageRatio;
    }
  } else {
    height = image.height;
    width = image.width;
  }
  return await ImageResizer.createResizedImage(
    Platform.OS === 'android' ? image.uri : image.source,
    width,
    height,
    'JPEG',
    Math.floor((1048576 * 100) / image.size)
      ? Math.floor((1048576 * 100) / image.size) / 2
      : 1,
  );
};

export const getCachedNetworkImageSize = ({
  imageUrl,
  onSuccess = () => {},
  onError = () => {},
}: {
  imageUrl: string;
  onSuccess?: (result: {width: number; height: number}) => void;
  onError?: () => void;
}) => {
  AsyncStorageLib.getItem('size:' + imageUrl)
    .then(result => {
      if (result) {
        const imageDimension = JSON.parse(result);
        onSuccess(imageDimension);
      } else {
        ImageComponent.getSize(imageUrl, (w, h) => {
          AsyncStorageLib.setItem(
            'size:' + imageUrl,
            JSON.stringify({width: w, height: h}),
          ).catch(() => {
            onError();
          });
          onSuccess({width: w, height: h});
        });
      }
    })
    .catch(() => {
      onError();
    });
};
