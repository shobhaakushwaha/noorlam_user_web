import api from "@/config/axiosInstance";

export const getproductList = async (params = {}) => {
  return api.get("/user/product/list", { decrypt: false, params });
};
