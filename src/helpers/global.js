import crypto from 'crypto';
import { JAUNT_RELATED_FILTERS, STATUSES } from './constants';

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
  const removed = result.splice(startIndex, 1);
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
  return crypto.randomBytes(20).toString('hex');
};

export const createFilterObj = (globalFilters = []) => {
  return {
    $and: [
      ...globalFilters.map(filter => ({
        $or: [
          ...filter?.children.map(child => ({ field: filter?.key, type: 'string', operator: 'equals', value: child }))
        ]
      }))
    ]
  };
};

export const isActiveParthname = (location, pathname) => {
  if (location?.pathname === pathname) return true;
  return false;
};

export const convertResponseToObj = response => {
  const trimmedStr = response?.slice(1, -1);

  const keyValuePairs = trimmedStr?.split(',');

  const obj = {};

  keyValuePairs.forEach(pair => {
    const [key, value] = pair?.split('=');
    obj[key.trim()] = value?.trim();
  });

  return obj;
};

export const convertBase64ToImage = response => {
  const byteCharacters = atob(response?.replace(/-/g, '+').replace(/_/g, '/'));
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: 'image/png' }); // Adjust the type according to the image format
  return URL.createObjectURL(blob);
};
