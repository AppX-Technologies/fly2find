import { API_KEY, ENDPOINTS, SCRIPT_URL } from './constants';
import { setIsUserLoggedInToLocal } from './session';
export const ABORT_ERROR = 'REQUEST_ABORTED';

// REST API Request Handler
export const makeRESTApiRequests = async ({
  endpoint,
  contentType = 'application/json',
  requestBody,
  method = 'POST',
  stringify = true,
  signal,
  doNotSendUpdatingAs
}) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  let updatingAs =
    [ENDPOINTS.GET_ME].includes(endpoint) || doNotSendUpdatingAs
      ? null
      : JSON.parse(sessionStorage.getItem('updating-user'));
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  if (contentType === 'multipart/form-data') {
    // Remove Content-Type header for multipart/form-data to let the browser set it
    delete headers['Content-Type'];
  } else {
    headers['Content-Type'] = contentType;
  }
  if (updatingAs?._id) {
    headers['Updating-As'] = updatingAs?._id;
  }
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
      method: method,
      body: requestBody ? (stringify ? JSON.stringify(requestBody) : requestBody) : undefined,
      headers,
      signal,
      credentials: 'include'
    });

    const responseBody = await response.json();
    if (response.status < 200 || response.status >= 300) {
      if (response.status === 401) {
        setTimeout(() => {
          setIsUserLoggedInToLocal(false);
          window.location.reload();
        }, 1500);
        return {
          error: 'Your session has expired, please try logging in again!'
        };
      }
      return { error: responseBody['message'] || 'Oops something went wrong!' };
    } else {
      return { response: responseBody };
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      return { error: ABORT_ERROR };
    }

    return { error: 'Oops something went wrong!' };
  }
};
export const makeApiRequests = async ({ requestType, requestBody = {} }) => {
  try {
    const response = await (await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        gid: localStorage.getItem('user-gid'),
        clientId: API_KEY,
        requestType,
        ...requestBody
      }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })).json();

    if (response['success']) {
      return { response };
    } else {
      return { error: response['reason'] || 'Oops something went wrong!' };
    }
  } catch (e) {
    console.log(e);
    return { error: 'Oops something went wrong!' };
  }
};
