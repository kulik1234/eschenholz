import React from 'react';

export const UserContext = React.createContext({
    user: {"test":"to jest test"},
    setUser: () => {}
});

export default UserContext;