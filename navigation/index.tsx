/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="TodoListScreen">
      <Stack.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        options={{ headerTitle: 'TodoList' }}
      />
      <Stack.Screen
        name="CreateTodoScreen"
        component={CreateTodoScreen}
        options={{ headerTitle: 'Create New Todo' }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
