import api from "@/config/axiosInstance";


// -----------create-account-------------------
export const registerUser = async (payload) => {
  return res = await api.post("/user/auth/register", payload);
};

// -----------Send-OTP-email/phone-------------------
export const sendOtp = async (data) => {
  return api.post("/user/otp/send-otp", data);
};
// -----------verify-OTP-email/phone-------------------
export const verifyOtp = async (data) => {
  return api.post("/user/otp/verify-otp", data);
};

// -----------login-account-------------------
export const loginUser = async (data) => {
  return api.post("/user/auth/login", data);
};


