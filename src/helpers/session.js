export const saveUserToLocal = user => {
  const updatedUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    token: user?.token,
    email: user?.email,
    role: user?.role
  };

  localStorage.setItem(user, JSON.stringify(updatedUser));
};

export const getProfileFromLocalStorage = () => {
  try {
    const profile = localStorage.getItem('user') || {};
    return JSON.parse(profile);
  } catch (e) {}
  return {};
};
