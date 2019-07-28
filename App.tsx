import React from 'react';
import { Provider } from 'react-redux';
import store from './src/ts/store';
import AppNavigator from './src/screens';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
