import api from "@/config/axiosInstance";

export const getCartList = async () => {
  return api.get("/user/category/list", { decrypt: false });
};
