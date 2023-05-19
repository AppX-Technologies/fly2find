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

// Creating The Image URL

// Base64-decode a string using Web-safe encoding
export const base64DecodeWebSafe = data => {
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  const padded = padBase64(base64);
  const uint8Array = base64ToUint8Array(padded);
  return uint8Array;
};

// Pad a Base64 string with additional characters as needed
export const padBase64 = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  return base64 + padding;
};

// Convert a Base64 string to a Uint8Array
export const base64ToUint8Array = base64 => {
  const string = window.atob(base64);
  const utf8Array = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    utf8Array[i] = string.charCodeAt(i);
  }
  return utf8Array;
};

// Create a Blob object from binary data and a MIME type
export const newBlob = (data, type) => {
  const blobData = [data];
  const options = { type };
  return new Blob(blobData, options);
};

// Create a data URL for a Blob object
export const createObjectURL = blob => {
  if (typeof window.URL !== 'undefined') {
    return window.URL.createObjectURL(blob);
  } else if (typeof window.webkitURL !== 'undefined') {
    return window.webkitURL.createObjectURL(blob);
  } else {
    return null;
  }
};

// Clean up a data URL created with createObjectURL
export const revokeObjectURL = url => {
  if (typeof window.URL !== 'undefined') {
    window.URL.revokeObjectURL(url);
  } else if (typeof window.webkitURL !== 'undefined') {
    window.webkitURL.revokeObjectURL(url);
  }
};

// useEffect(() => {
//   // Assuming the `response` variable holds the returned response from the `readFile` function

//   // Decode the Base64-encoded chunk data
//   const imageData = base64DecodeWebSafe(response.chunkData);

//   // Create a Blob from the decoded image data
//   const imageBlob = newBlob(imageData, 'image/jpeg');

//   // Convert the Blob to a data URL
//   const imageUrl = createObjectURL(imageBlob);

//   // Set the image source in the component state
//   setImageSrc(imageUrl);

//   // Clean up the data URL when the component unmounts
//   return () => revokeObjectURL(imageUrl);
// }, []);
