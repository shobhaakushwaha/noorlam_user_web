import api from "@/config/axiosInstance";

export const getproductList = async () => {
  return api.get("/user/product/list", { decrypt: false });
};
