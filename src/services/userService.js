import { makeRESTApiRequests } from '../helpers/api';
import { ENDPOINTS } from '../helpers/constants';

export const userService = {
  updateMultipleUser: async requestBody => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.UPDATE_MULTIPLE_USERS,
      requestBody,
      method: 'PUT'
    });

    return { response, error };
  },
  getUsers: async (requestBody, signal, doNotSendUpdatingAs) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.USERS_LIST,
      requestBody,
      signal,
      doNotSendUpdatingAs
    });

    return { response, error };
  },
  resetPassword: async (requestBody, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.RESET_PASSWORD,
      requestBody,
      method: 'POST',
      signal
    });

    return { response, error };
  },
  getUserByID: async (userId, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GET_USER_BY_ID(userId),
      method: 'GET',
      signal
    });

    return { response, error };
  },
  getUserByUserID: async (userId, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GET_USER_BY_USER_ID(userId),
      method: 'GET',
      signal
    });

    return { response, error };
  },
  updateUser: async (user, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.UPDATE_USER_DETAILS,
      requestBody: user,
      method: 'POST',
      signal
    });

    return { response, error };
  },
  createUser: async (user, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.CREATE_USER,
      requestBody: user,
      method: 'POST',
      signal
    });

    return { response, error };
  },
  updateUserStatus: async (user, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.UPDATE_USER_DETAILS,
      requestBody: user,
      method: 'POST',
      signal
    });

    return { response, error };
  },
  deleteUser: async (deleteInfo, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.DELETE_USER,
      method: 'DELETE',
      requestBody: deleteInfo,
      signal
    });

    return { response, error };
  },
  forgotPassword: async (userInfo, signal) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.FORGOT_PASSWORD,
      method: 'POST',
      requestBody: userInfo,
      signal
    });

    return { response, error };
  },
  searchUserFiles: async reqBody => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.SEARCH_USER_FILES,
      method: 'POST',
      requestBody: reqBody
    });

    return { response, error };
  },
  createUserFile: async reqBody => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.CREATE_USER_FILES,
      method: 'POST',
      requestBody: reqBody
    });

    return { response, error };
  },
  updateUserFile: async (fileId, reqBody) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.USER_FILES_ID(fileId),
      method: 'POST',
      requestBody: reqBody
    });

    return { response, error };
  },
  deleteUserFile: async fileId => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.USER_FILES_ID(fileId),
      method: 'DELETE'
    });

    return { response, error };
  },
  getUserStats: async reqBody => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GET_USER_STATS,
      method: 'POST',
      requestBody: reqBody
    });

    return { response, error };
  },

  getUserByResetPassword: async key => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GET_USER_BY_RESET_PASSWORD_LINK(key),
      method: 'GET'
    });

    return { response, error };
  }
};
