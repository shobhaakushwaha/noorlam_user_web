import api from "@/config/axiosInstance";

export const getCategoryList = async () => {
  return api.get("/masters/category/list", { decrypt: false });
};
