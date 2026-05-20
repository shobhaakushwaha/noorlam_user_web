import api from "@/config/axiosInstance";
import { encryptData } from "@/utils/crypto";

export const getproductList = async (params = {}) => {
  const reqData = encryptData(params);

  console.log("Product list request payload:", params);
  console.log("Encrypted product list request:", reqData);

  return api.get("/user/product/list", {
    decrypt: false,
    params: reqData ? { reqData } : params,
  });
};
