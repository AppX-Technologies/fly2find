import { v4 as uuid } from 'uuid';

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

export const isFileUploadingInProcess = fileData => {
  if (!fileData?.toBeUploaded && !fileData?.alreadyUploaded) {
    return false;
  }
  return true;
};

export const findSpecificJaunt = (allJaunts, jauntId) => {
  return allJaunts.find(jaunt => jaunt.id === jauntId);
};

export const generateRandomUUID = () => {
  return uuid();
};

export const getValidUrl = link => {
  if (!link.startsWith('https://') && !link.startsWith('http://')) {
    link = 'https://' + link;
  }

  return link;
};

export const updateItemsInArray = (originalData, updatedData, key = '_id') => {
  const returnData = [...originalData];

  if (!Array.isArray(updatedData)) {
    updatedData = [updatedData];
  }

  updatedData.forEach(newData => {
    const existingIndex = returnData.findIndex(d => d[key] === newData[key]);
    if (existingIndex !== -1) {
      returnData[existingIndex] = newData;
    } else {
      returnData.unshift(newData);
    }
  });

  return returnData;
};
