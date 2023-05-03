const firebaseErrors = {
  'auth/email-already-exists': 'The provided email is already in use by an existing user.',
  'auth/invalid-email': 'The provided value for the email is invalid.',
  'auth/invalid-password': 'The provided value for the password is invalid.',
  'auth/invalid-phone-number': 'The provided value for the phone number is invalid.',
  'auth/phone-number-already-exists': 'The provided phone number is already in use by an existing user.',
  'auth/user-not-found': 'There is no existing user corresponding to the provided email.',
  'auth/wrong-password': 'Provided email/password do not match',
  'auth/email-already-in-use': 'The provided email is already in use by an existing user.',
  'auth/weak-password': 'Password should be at least 6 characters'
};

export const getErrorMessageFromFirebase = e => {
  return firebaseErrors[e.code] || e.message || 'Oops, Something went wrong!';
};

export const isAdmin = role => role === 'Admin';
export const isStaff = role => role === 'Admin' || role === 'Staff';
export const isClient = role => role === 'Client';

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
