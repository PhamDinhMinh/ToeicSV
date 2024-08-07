import * as React from 'react';
import Svg, {Path, Defs, Stop, LinearGradient} from 'react-native-svg';

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

function EmojiAngry({height, width}: props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16">
      <Path
        fill="url(#prefix__paint0_linear)"
        d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8"
      />
      <Path
        fill="#000"
        d="M5.2 13.551c0 .528 1.253.444 2.8.444 1.546 0 2.8.084 2.8-.444 0-.636-1.254-1.051-2.8-1.051-1.547 0-2.8.415-2.8 1.051z"
        filter="url(#prefix__filter0_d)"
      />
      <Path
        fill="url(#prefix__paint1_linear)"
        d="M5.2 13.551c0 .528 1.253.444 2.8.444 1.546 0 2.8.084 2.8-.444 0-.636-1.254-1.051-2.8-1.051-1.547 0-2.8.415-2.8 1.051z"
      />
      <Path
        fill="url(#prefix__paint2_linear)"
        d="M3.6 9.831c0-.79.538-1.43 1.2-1.43.663 0 1.2.64 1.2 1.43 0 .33-.093.633-.252.874a.527.527 0 01-.318.22c-.15.036-.373.075-.63.075s-.481-.039-.63-.075a.524.524 0 01-.318-.22 1.588 1.588 0 01-.252-.874zm6.4 0c0-.79.537-1.43 1.2-1.43.662 0 1.2.64 1.2 1.43 0 .33-.094.633-.252.874a.524.524 0 01-.318.22c-.207.05-.418.075-.63.075-.257 0-.48-.039-.63-.075a.53.53 0 01-.32-.22 1.596 1.596 0 01-.25-.874z"
      />
      <Path
        fill="#000"
        d="M3.6 9.831c0-.79.538-1.43 1.2-1.43.663 0 1.2.64 1.2 1.43 0 .33-.093.633-.252.874a.527.527 0 01-.318.22c-.15.036-.373.075-.63.075s-.481-.039-.63-.075a.524.524 0 01-.318-.22 1.588 1.588 0 01-.252-.874zm6.4 0c0-.79.537-1.43 1.2-1.43.662 0 1.2.64 1.2 1.43 0 .33-.094.633-.252.874a.524.524 0 01-.318.22c-.207.05-.418.075-.63.075-.257 0-.48-.039-.63-.075a.53.53 0 01-.32-.22 1.596 1.596 0 01-.25-.874z"
        filter="url(#prefix__filter1_i)"
      />
      <Path
        fill="#4F4F67"
        d="M4.968 9.333a.33.33 0 01.007.07c0 .202-.176.367-.394.367-.217 0-.393-.165-.393-.366 0-.083.03-.16.08-.221.224.053.46.104.7.15zm5.927.437c-.211 0-.383-.153-.393-.348.258-.038.515-.085.765-.136.014.038.021.078.02.119 0 .2-.175.365-.393.365z"
      />
      <Path
        fill="#000"
        d="M9 7.6c0-.446.163-.6.445-.6.28 0 .414.276.506 1.066 1.128 0 3.038-.534 3.222-.534.178 0 .277.085.317.267.035.158-.023.308-.221.4-.621.287-2.443.935-3.984.935-.168 0-.285-.086-.285-.301V7.6zm-2.951.466C6.14 7.276 6.275 7 6.555 7c.282 0 .445.154.445.6v1.233c0 .215-.117.301-.285.301-1.541 0-3.363-.648-3.984-.935-.198-.092-.256-.242-.221-.4.04-.182.14-.267.317-.267.184 0 2.094.534 3.222.534z"
        filter="url(#prefix__filter2_d)"
      />
      <Path
        fill="url(#prefix__paint3_linear)"
        d="M9 7.6c0-.446.163-.6.445-.6.28 0 .414.276.506 1.066 1.128 0 3.038-.534 3.222-.534.178 0 .277.085.317.267.035.158-.023.308-.221.4-.621.287-2.443.935-3.984.935-.168 0-.285-.086-.285-.301V7.6zm-2.951.466C6.14 7.276 6.275 7 6.555 7c.282 0 .445.154.445.6v1.233c0 .215-.117.301-.285.301-1.541 0-3.363-.648-3.984-.935-.198-.092-.256-.242-.221-.4.04-.182.14-.267.317-.267.184 0 2.094.534 3.222.534z"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={8}
          x2={8}
          y2={10.751}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E04300" />
          <Stop offset={1} stopColor="#FFA320" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={8}
          x2={8}
          y1={12.703}
          y2={14}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3D0D00" />
          <Stop offset={1} stopColor="#661C04" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={8}
          x2={8}
          y1={8.4}
          y2={11}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#191A33" />
          <Stop offset={0.872} stopColor="#3B426A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={11.615}
          x2={11.615}
          y1={9.333}
          y2={7}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#9A2F00" />
          <Stop offset={1} stopColor="#D44800" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default EmojiAngry;
