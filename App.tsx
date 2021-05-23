import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';

import { Provider } from './contexts/Provider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Root } from 'native-base';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <Provider>
        <SafeAreaProvider>
          <Root>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Root>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
