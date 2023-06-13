import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function useAuth() {
  const context = useContext(UserContext);

  return context;
}

export default useAuth;
