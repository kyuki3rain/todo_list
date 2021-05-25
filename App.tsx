import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import AWSAppSyncClient from "aws-appsync";
import { Root } from 'native-base';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

import appSyncConfig from './aws-exports';
import { Provider } from './contexts/Provider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType as "API_KEY",
    apiKey: appSyncConfig.aws_appsync_apiKey,
  }
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Provider>
            <SafeAreaProvider>
              <Root>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </Root>
            </SafeAreaProvider>
          </Provider>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}
