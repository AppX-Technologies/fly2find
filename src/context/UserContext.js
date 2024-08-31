import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularProgressBar from '../components/common/circular-progress';
import { makeRESTApiRequests } from '../helpers/api';
import { getIsUserLoggedInFromLocal, setIsUserLoggedInToLocal } from '../helpers/session';
import { authService } from '../services/authService';
import { ENDPOINTS } from '../helpers/constants';

//A provider that fetches user if user has already signed up.
//we only store the user access token
//from this access token, we fetch user info on every refresh

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();
  const [fetchingUser, setFetchingUser] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(getIsUserLoggedInFromLocal());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const getMe = async () => {
    setFetchingUser(true);

    const { response, error } = await authService.getMe();

    setFetchingUser(false);

    if (error) {
      toast.error(error);
      return;
    }
    setUser(response);
  };

  const login = async (email, password) => {
    setIsLoggingIn(true);

    try {
      setLoginError('');
      const { response: authResult, error } = await authService.signIn(email, password);

      setIsLoggingIn(false);
      if (error) {
        setLoginError(error);
        return;
      }
      if (redirect) {
        navigate(redirect);
      }
      setUserLoggedIn(true);
      setIsUserLoggedInToLocal(true);
    } catch (e) {
      setIsLoggingIn(false);
      setLoginError('Something went wrong! Please try again');
      console.log(e);
    }
  };

  const logout = () => {
    makeRESTApiRequests({
      endpoint: ENDPOINTS.USERS_LOGOUT,
      method: 'GET'
    }).catch(() => {});

    setIsUserLoggedInToLocal(false);
    setUserLoggedIn(false);
  };

  const onUserChange = userObj => {
    setUser(userObj);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      getMe();
    } else {
      setUser(null);
    }
  }, [isUserLoggedIn]);

  const contextObj = {
    isUserLoggedIn,
    login,
    logout,
    user,
    onUserChange,
    isLoggingIn,
    loginError
  };

  return !isUserLoggedIn || (user && !fetchingUser) ? (
    <UserContext.Provider value={contextObj}>{children}</UserContext.Provider>
  ) : (
    <div>
      <CircularProgressBar size={100} />
    </div>
  );
};
