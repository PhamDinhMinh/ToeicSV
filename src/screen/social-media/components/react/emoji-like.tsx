import * as React from 'react';
import Svg, {LinearGradient, Stop, G, Path} from 'react-native-svg';

type props = React.ComponentProps<typeof Svg>;

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
  }
  export interface PathProps {
    filter?: string;
  }
}

function EmojiLike({width, height}: props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="-9.31 -9.31 200.6 200.599">
      <LinearGradient
        id="prefix__a"
        x1="47.061%"
        x2="47.061%"
        y1="-3.394%"
        y2="96.606%">
        <Stop offset={0} stopColor="#37aeff" />
        <Stop offset={0.05} stopColor="#37aeff" />
        <Stop offset={1} stopColor="#1861f7" />
      </LinearGradient>
      <G fill="none">
        <Path
          d="M0 95.645c0 52.823 42.822 95.644 95.645 95.644 52.823 0 95.644-42.821 95.644-95.644C191.29 42.822 148.468 0 95.645 0A95.617 95.617 0 000 95.645"
          fill="url(#prefix__a)"
        />
        <Path
          d="M151.421 99.986a9.095 9.095 0 00-3.901-8.737 18.08 18.08 0 003.6-8.628c0-8.463-7.941-10.99-20.168-10.99-7.27.08-14.51.936-21.597 2.555.66-3.627 5.496-14.15 5.496-17.667 0-7.31-1.731-16.486-8.436-19.976a11.925 11.925 0 00-6.154-1.593c-2.68-.126-5.303.8-7.309 2.583a6.32 6.32 0 00-.742 3.681l1.21 13.738c0 10.99-16.899 24.729-16.899 40.528v33.136c0 5.88 7.886 10.056 19.234 10.056h31.46c8.243 0 10.084-1.428 12.2-5.275a7.583 7.583 0 00-.166-8.023 12.364 12.364 0 007.749-8.93 10.58 10.58 0 00-1.044-7.089 9.48 9.48 0 005.495-9.369M48.743 80.945h9.836a8.243 8.243 0 018.243 8.243V135.1a8.243 8.243 0 01-8.243 8.242h-9.836A8.243 8.243 0 0140.5 135.1V89.298a8.243 8.243 0 018.243-8.243"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default EmojiLike;
