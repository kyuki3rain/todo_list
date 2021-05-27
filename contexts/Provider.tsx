import React from 'react';
import { UserProvider } from './providers/UserProvider';

export const Provider: React.FC = ({children}) => {
    return (
        <UserProvider>{children}</UserProvider>
    );
}