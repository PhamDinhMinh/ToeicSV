import {EPart} from '@/enum/part';
import {useMemo} from 'react';

export const useTextPart = (value: number) => {
  const partName = useMemo(() => {
    switch (value) {
      case EPart.Part1:
        return 'Part 1';
      case EPart.Part2:
        return 'Part 2';
      case EPart.Part3:
        return 'Part 3';
      case EPart.Part4:
        return 'Part 4';
      case EPart.Part5:
        return 'Part 5';
      case EPart.Part6:
        return 'Part 6';
      case EPart.Part7:
        return 'Part 7';
      default:
        return 'Part 1';
    }
  }, [value]);

  return partName;
};
