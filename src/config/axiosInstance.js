
import { getToken, removeToken } from "@/utils/cookie";
import { encryptData, decryptData } from "@/utils/crypto";
import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log('process.env.NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL)
/* =====================================
   REQUEST INTERCEPTOR
===================================== */
api.interceptors.request.use(
  (config) => {
    try {
      // 🔐 Attach Authorization Token
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 📦 Handle Multipart/FormData (Skip Encryption)
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
      }

      // 🔓 Skip Encryption if Explicitly Disabled
      if (config.encrypt === false) {
        return config;
      }

      // 🔒 Encrypt Normal JSON Data
      if (config.data && ["post", "put", "patch", "delete"].includes(config.method)) {
        config.data = {
          reqData: encryptData(config.data),
        };
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

/* =====================================
   RESPONSE INTERCEPTOR
===================================== */
api.interceptors.response.use(
  (response) => {
    try {
      const shouldDebugResponse = response.config?.debugResponse === true;

      if (response.config?.decrypt === false) {
        if (shouldDebugResponse) {
          console.log("API Response:", response.data);
        }
        return response;
      }

      // 🔓 Decrypt Encrypted Response
      if (typeof response?.data?.data === "string") {
        const decrypted = decryptData(response.data.data);
        if (!decrypted?.response) return response;

        if (shouldDebugResponse) {
          console.log("Decrypted API Response:", decrypted.response);
        }

        return {
          ...response,
          data: decrypted.response.data,
          message: decrypted.response.message,
          status: decrypted.response.status,
        };
      }
      if (shouldDebugResponse) {
        console.log("API Response:", response.data);
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    try {
      // 🔓 Decrypt Encrypted Error Response
      if (typeof error?.response?.data?.data === "string") {
        const decryptedError = decryptData(error.response.data.data);
        if (decryptedError?.response) {
          error.response.data = decryptedError.response;
          error.message = decryptedError.response.message;
        }
      }
      // 🚫 Handle Unauthorized Access
      if (error.response?.status === 401) {
        removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default api;
