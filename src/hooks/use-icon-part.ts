import {EPart} from '@/screen/enum/part';
import {useMemo} from 'react';

export const usePartImage = (value: number) => {
  const partImage = useMemo(() => {
    switch (value) {
      case EPart.Part1:
        return require('@/assets/images/icon-part/icon-part1.png');
      case EPart.Part2:
        return require('@/assets/images/icon-part/icon-part2.png');
      case EPart.Part3:
        return require('@/assets/images/icon-part/icon-part3.png');
      case EPart.Part4:
        return require('@/assets/images/icon-part/icon-part4.png');
      case EPart.Part5:
        return require('@/assets/images/icon-part/icon-part5.png');
      case EPart.Part6:
        return require('@/assets/images/icon-part/icon-part6.png');
      case EPart.Part7:
        return require('@/assets/images/icon-part/icon-part7.png');
      default:
        return require('@/assets/images/icon-part/icon-part1.png');
    }
  }, [value]);

  return partImage;
};
