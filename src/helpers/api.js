import { API_KEY, SCRIPT_PROD_URL } from './constants';

export const makeApiRequests = async ({ requestType, requestBody = {} }) => {
  try {
    const response = await (await fetch(SCRIPT_PROD_URL, {
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
