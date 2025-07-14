import axiosInstance from "@/utils/axiosInstance";

const sendRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`api/contact/request-send/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const cancelRequest = async (userId) => {
  try {
    const response = await axiosInstance.delete(`api/contact/request-cancel/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const acceptRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`api/contact/request-accept/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const dismissRequest = async (userId) => {
  try {
    const response = await axiosInstance.delete(`api/contact/request-dismiss/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const contactAPI = {
  sendRequest,
  cancelRequest,
  acceptRequest,
  dismissRequest,
}

export default contactAPI;
