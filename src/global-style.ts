import {createTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const color = {
  green_300: '#9edc7a',
  green_400: '#86d45a',
  green_500: '#6fcc3a',
  green_600: '#60bb32',
  green_700: '#4aa728',
  green_800: '#33931e',
  green_base_200: '#24d0b1',
  green_base_300: '#24d0a3',
  green_base_400: '#24d094',
  green_base_500: '#24d086',
  green_base_600: '#24d078',
  green_base_700: '#24d069',
  green_base_800: '#24d05b',
  grey_200: '#eeeeee',
  grey_300: '#e0e0e0',
  grey_400: '#bdbdbd',
  grey_500: '#9e9e9e',
  grey_600: '#757575',
  grey_700: '#616161',
  grey_800: '#424242',
  red_200: '#ff6c68',
  red_300: '#ff6260',
  red_400: '#ff5857',
  red_500: '#ff4d4f',
  red_600: '#f44247',
  red_700: '#e9373f',
  yello_200: '#feeab3',
  yello_300: '#fde39a',
  yello_400: '#fddc81',
  yello_500: '#fdd567',
  yello_600: '#fcce4e',
  yello_700: '#fcc735',
  yello_800: '#fcc01c',
  yello_900: '#fcba03',
  orange_200: '#ffd699',
  orange_300: '#ffc166',
  orange_400: '#ffad33',
  orange_500: '#ff9800',
  orange_600: '#cc7a00',
  orange_700: '#995b00',
  orange_800: '#663d00',
  orange_900: '#331E00',
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
    primary: '#24d086',
    secondary: '#24d0a3',
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
