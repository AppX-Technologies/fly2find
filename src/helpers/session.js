import { ADMIN_ROLE } from './constants';

export const getIsUserLoggedInFromLocal = () => {
  return Boolean(localStorage.getItem('user-is-loggedin'));
};

export const setIsUserLoggedInToLocal = isLoggedIn => {
  if (isLoggedIn) {
    localStorage.setItem('user-is-loggedin', isLoggedIn);
  } else {
    localStorage.clear();
  }
};

export const isAdmin = role => [ADMIN_ROLE].includes(role);

export const saveUserToLocal = (user, saveToken) => {
  user['role'] = user['role'];

  localStorage.setItem('user-email', user['email']);
  if (saveToken) localStorage.setItem('user-token', user['token']);
  localStorage.setItem('user-name', user['name']);
  localStorage.setItem('user-role', user['role']);

  const requiredFields = ['name', 'email', 'phone', 'role', 'token', '_id'];
  const userJSON = {};
  requiredFields.forEach(f => (userJSON[f] = user[f]));
  localStorage.setItem('user', JSON.stringify(userJSON));
};

export const getProfileFromLocalStorage = () => {
  try {
    const profile = localStorage.getItem('user') || {};
    return JSON.parse(profile);
  } catch (e) {}
  return {};
};
