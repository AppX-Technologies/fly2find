import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cachedUserInfo = JSON.parse(localStorage.getItem('user'));

    if (cachedUserInfo) {
      setUser({ ...cachedUserInfo });
    }
  }, []);

  // clear is used to reset the user state to null

  const onUserChange = (userObj = {}, clear = false) => {
    if (!clear) {
      setUser({ ...user, ...userObj });
    } else {
      setUser(null);
      localStorage.clear();
    }
  };

  const contextObj = {
    user,
    onUserChange
  };

  return <UserContext.Provider value={contextObj}>{children}</UserContext.Provider>;
};
