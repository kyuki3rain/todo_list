import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/UserReducer';
import { UserAction, UserState } from '../reducers/UserReducer';

export const UserStateContext = createContext({} as UserState);
export const UserDispatchContext = createContext({} as React.Dispatch<UserAction>);

export const UserProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { user: null, loggedIn: false});
  
    return (
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    );
  }