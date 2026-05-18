import api from "@/config/axiosInstance";

export const getSellerList = async () => {
  return api.get("/user/seller/list", { decrypt: false });
};

export const getPremiumSellerList = async () => {
  return api.get("/user/seller/list", { decrypt: false });
};
