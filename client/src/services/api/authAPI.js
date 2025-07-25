import { base } from "@/utils/axiosInstance";
import axiosInstance from "@/utils/axiosInstance";

const authenticate = async (user, route) => {
  try {
    const response = await axiosInstance.post(`/api/auth/${route}`, user);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error(error);
  }
}

const refresh = async () => {
  try {
    const response = await base.post("/api/auth/refresh");
    return response.data.userId;
  } catch (error) {
    console.error(error);
  }
}

const check = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/check");
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

const authAPI = { 
  check,
  logout, 
  refresh,
  authenticate,
}; 

export default authAPI;
