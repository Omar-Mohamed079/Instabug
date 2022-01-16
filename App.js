import {configureStore} from '@reduxjs/toolkit';
import React, {useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import moviesReducer from './app/redux/moviesSlice';
import HomeScreen from './app/screens/HomeScreen';
const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
