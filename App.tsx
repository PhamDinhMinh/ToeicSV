import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

import {Icon} from '@rneui/base';
import {ThemeProvider} from '@rneui/themed';
import {theme} from '@/global-style';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@/screen/app-navigator';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <ToastProvider
          offsetTop={50}
          dangerIcon={<Icon name="warning" type="ionicon" color={'#ffcc00'} />}
          dangerColor={'#ff6600'}>
          <AppNavigator />
        </ToastProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
