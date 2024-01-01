import React from 'react';
import {StatusBar} from 'react-native';

import {Icon} from '@rneui/base';
import {ThemeProvider} from '@rneui/themed';
import {theme} from 'global-style';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Icon name="warning" type="ionicon" color={'#ffcc00'} />
    </ThemeProvider>
  );
};

export default App;
