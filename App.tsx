import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { Root } from 'native-base';
import { createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client/react';


import appSyncConfig from './aws-exports';
import { Provider } from './contexts/Provider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey: appSyncConfig.aws_appsync_apiKey
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth })
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <SafeAreaProvider>
            <Root>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </Root>
          </SafeAreaProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}
