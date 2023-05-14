import { API_KEY, SCRIPT_URL } from './constants';

export const makeApiRequests = async ({ requestType, requestBody = {} }) => {
  const accessToken = localStorage.getItem('user-token');
  try {
    const response = await (await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        clientId: API_KEY,
        requestType,
        payload: requestBody,
        accessToken
      }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })).json();

    if (response['success']) {
      return { response };
    } else {
      return { error: response['message'] || 'Oops something went wrong!' };
    }
  } catch (e) {
    return { error: 'Oops something went wrong!' };
  }
};
