import api from "@/config/axiosInstance";

export const getBannerList = async () => {
  return api.get("/user/banner/list", { decrypt: false });
};
