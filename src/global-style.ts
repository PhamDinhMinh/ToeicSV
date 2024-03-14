import {createTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const color = {
  green_300: '#9edc7a',
  green_400: '#86d45a',
  green_500: '#6fcc3a',
  green_600: '#60bb32',
  green_700: '#4aa728',
  green_800: '#33931e',
  grey_200: '#eeeeee',
  grey_300: '#e0e0e0',
  grey_400: '#bdbdbd',
  grey_500: '#9e9e9e',
  grey_600: '#757575',
  grey_700: '#616161',
  grey_800: '#424242',
};

const globalStyles = StyleSheet.create({
  text34Regular: {
    fontSize: 34,
    fontWeight: '400',
  },
  text34Medium: {
    fontWeight: '500',
    fontSize: 34,
  },
  text34Bold: {
    fontWeight: '700',
    fontSize: 34,
  },
  text34SemiBold: {
    fontWeight: '600',
    fontSize: 34,
  },
  text28Regular: {
    fontWeight: '400',
    fontSize: 28,
  },
  text28Medium: {
    fontWeight: '500',
    fontSize: 28,
  },
  text28Bold: {
    fontWeight: '700',
    fontSize: 28,
  },
  text28SemiBold: {
    fontWeight: '600',
    fontSize: 28,
  },
  text22Regular: {
    fontWeight: '400',
    fontSize: 22,
  },
  text22Medium: {
    fontWeight: '500',
    fontSize: 22,
  },
  text22Bold: {
    fontWeight: '700',
    fontSize: 22,
  },
  text22SemiBold: {
    fontWeight: '600',
    fontSize: 22,
  },
  text20Regular: {
    fontWeight: '400',
    fontSize: 20,
  },
  text20Medium: {
    fontWeight: '500',
    fontSize: 20,
  },
  text20Bold: {
    fontWeight: '700',
    fontSize: 20,
  },
  text20SemiBold: {
    fontWeight: '600',
    fontSize: 20,
  },
  text18Regular: {
    fontWeight: '400',
    fontSize: 18,
  },
  text18Medium: {
    fontWeight: '500',
    fontSize: 18,
  },
  text18Bold: {
    fontWeight: '700',
    fontSize: 18,
  },
  text18SemiBold: {
    fontWeight: '600',
    fontSize: 18,
  },
  text17Regular: {
    fontWeight: '400',
    fontSize: 17,
  },
  text17Medium: {
    fontWeight: '500',
    fontSize: 17,
  },
  text17Bold: {
    fontWeight: '700',
    fontSize: 17,
  },
  text17SemiBold: {
    fontWeight: '600',
    fontSize: 17,
  },
  text16Regular: {
    fontSize: 16,
    fontWeight: '400',
  },
  text16Medium: {
    fontSize: 16,
    fontWeight: '500',
  },
  text16Bold: {
    fontSize: 16,
    fontWeight: '700',
  },
  text16SemiBold: {
    fontSize: 16,
    fontWeight: '600',
  },
  text15Regular: {
    fontSize: 15,
    fontWeight: '400',
  },
  text15Medium: {
    fontSize: 15,
    fontWeight: '500',
  },
  text15Bold: {
    fontSize: 15,
    fontWeight: '700',
  },
  text15SemiBold: {
    fontSize: 15,
    fontWeight: '700',
  },
  text14Regular: {
    fontSize: 15,
    fontWeight: '400',
  },
  text14Medium: {
    fontSize: 14,
    fontWeight: '500',
  },
  text14Bold: {
    fontSize: 14,
    fontWeight: '700',
  },
  text14SemiBold: {
    fontSize: 14,
    fontWeight: '700',
  },
  text13Regular: {
    fontSize: 13,
    fontWeight: '400',
  },
  text13Medium: {
    fontSize: 13,
    fontWeight: '500',
  },
  text13Bold: {
    fontSize: 13,
    fontWeight: '700',
  },
  text13SemiBold: {
    fontSize: 13,
    fontWeight: '600',
  },
  text12Regular: {
    fontSize: 12,
    fontWeight: '400',
  },
  text12Medium: {
    fontSize: 12,
    fontWeight: '500',
  },
  text12Bold: {
    fontSize: 12,
    fontWeight: '700',
  },
  text12SemiBold: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export const theme = createTheme({
  lightColors: {
    white: '#FFF',
    primary: '#89B05F',
    secondary: '#ACC981',
    background: '#F3FBED',
  },
  darkColors: {
    primary: '#27374D',
    secondary: '#526D82',
    // 9DB2BF
    // DDE6ED
  },
  mode: 'light',
  spacing: {},
  components: {},
});

export {color};

export default globalStyles;
