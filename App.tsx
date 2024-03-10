import React from 'react';
import {StatusBar} from 'react-native';

import {Icon, Text} from '@rneui/base';
import {ThemeProvider} from '@rneui/themed';
import {theme} from '@/global-style';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Icon name="warning" type="ionicon" color={'#ffcc00'} size={50} />
      <Text>Hello anh em</Text>
    </ThemeProvider>
  );
};

export default App;
