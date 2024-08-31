import { makeRESTApiRequests } from "../helpers/api";
import { ENDPOINTS } from "../helpers/constants";

export const authService = {
  signIn: async (email, password) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.LOGIN,
      requestBody: { email, password },
    });

    return { response, error };
  },
  register: async (formData) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.REGISTER,
      requestBody: formData,
    });

    return { response, error };
  },
  getMe: async () => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GET_ME,
      method: "GET",
    });

    return { response, error };
  },
  generateRegistrationOTP: async (email) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.GENERATE_REGISTRATION_OTP,
      requestBody: { email },
    });

    return { response, error };
  },
  forgotPassword: async (email) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.FORGOT_PASSWORD,
      requestBody: { email },
    });

    return { response, error };
  },
  resetPassword: async (formData) => {
    const { response, error } = await makeRESTApiRequests({
      endpoint: ENDPOINTS.RESET_PASSWORD,
      requestBody: { ...formData },
    });

    return { response, error };
  },
};
