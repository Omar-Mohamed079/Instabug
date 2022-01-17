import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import HomeScreen from './app/screens/HomeScreen';
import store from "./app/redux/store"
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
