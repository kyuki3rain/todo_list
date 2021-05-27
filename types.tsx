/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Todo } from "./graphql/generated/graphql";

export type RootStackParamList = {
  TodoListScreen: undefined;
  CreateTodoScreen: { todo?: Todo };
  NotFound: undefined;
};
