import React from 'react';
import {StyleSheet} from 'react-native';
import DrawerScreen from './Routes/Drawer';

const App = () => {
  return <DrawerScreen />;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
