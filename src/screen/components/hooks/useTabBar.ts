import {useMemo} from 'react';
import {Platform, useWindowDimensions} from 'react-native';

export const useTabBarSize = () => {
  const {width} = useWindowDimensions();
  return useMemo(() => {
    const tabBarWidth = width < 440 ? width : width;
    const centerTabWidth = tabBarWidth * (width < 440 ? 0.2 : 0.15);
    return {
      tabBarHeight:
        Platform.select({
          ios: width < 440 ? 55 : 80,
          android: width < 440 ? 66 : 80,
        }) ?? 80,
      tabBarWidth: tabBarWidth,
      centerTabWidth: centerTabWidth,
      tabWidth: (tabBarWidth - centerTabWidth) / 4,
      cycleButtonWidth: width < 440 ? 54 : 65,
    };
  }, [width]);
};
