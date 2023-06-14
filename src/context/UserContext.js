import React, { createContext, useState, useEffect } from 'react';
import { makeApiRequests } from '../helpers/api';
import { toast } from 'react-toastify';

export const UserContext = createContext();

const getCachedUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getCachedUser() || null);

  const getMe = async () => {
    const { error, response } = await makeApiRequests({
      requestType: 'get-me'
    });

    if (error) {
      return toast.error(error);
    }

    setUser({ ...response, success: undefined });
  };

  const onUserChange = (userObj = {}) => {
    console.log(userObj, 'userObj');
    setUser({ ...user, ...userObj });
  };

  const onUserLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (user) {
      getMe();
    }
  }, []);

  const contextObj = {
    user,
    onUserChange,
    onUserLogout
  };

  return <UserContext.Provider value={contextObj}>{children}</UserContext.Provider>;
};
