import React from 'react';
import { TodoListProvider } from './providers/TodoListProvider';

export const Provider: React.FC = ({children}) => {
    return (
        <TodoListProvider>{children}</TodoListProvider>
    );
}