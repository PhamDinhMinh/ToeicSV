import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

import {Icon} from '@rneui/base';
import {ThemeProvider} from '@rneui/themed';
import {theme} from '@/global-style';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@/screen/app-navigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <ToastProvider
            offsetTop={50}
            dangerIcon={
              <Icon name="warning" type="ionicon" color={'#ffcc00'} />
            }
            dangerColor={'#ff6600'}>
            <AppNavigator />
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
