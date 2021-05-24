import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/TodoListReducer';

export const TodoListStateContext = createContext({} as TodoListState);
export const TodoListDispatchContext = createContext({} as React.Dispatch<TodoListAction>);

export const TodoListProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { todo_list: []});
  
    return (
      <TodoListStateContext.Provider value={state}>
        <TodoListDispatchContext.Provider value={dispatch}>
          {children}
        </TodoListDispatchContext.Provider>
      </TodoListStateContext.Provider>
    );
  }