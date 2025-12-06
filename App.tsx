import React from 'react';
import { AppContextProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AppContextProvider>
      <RootNavigator />
    </AppContextProvider>
  );
}
