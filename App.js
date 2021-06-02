import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';

import AppStack from './src/routes/app';

import {
  Provider as PaperProvider,
} from 'react-native-paper';

console.disableYellowBox = true;

const App = () => {

  useEffect(() => {
    AsyncStorage.setItem('@permission', 'no');
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <AppStack/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
