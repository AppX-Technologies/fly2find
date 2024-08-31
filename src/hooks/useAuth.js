import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useAuth = () => {
  const { isUserLoggedIn, login, logout, user, onUserChange, isLoggingIn, loginError } = useContext(UserContext);

  return {
    isUserLoggedIn,
    login,
    logout,
    user,
    onUserChange,
    isLoggingIn,
    loginError
  };
};

export default useAuth;
