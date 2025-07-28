import axiosInstance from "@/utils/axiosInstance";

const getUser = async () => {
  try {
    const response = await axiosInstance.get("/api/user");
    return { status: 200, user: response.data.user };
  } catch (error) {
    return {
      status: error.response?.status,
      data: error.response?.data?.message,
    };
  }
};

const updateUserInfo = async (user) => {
  try {
    const response = await axiosInstance.put("/api/user", user);
    return { status: 200, user: response.data.user ,message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const searchUsers = async (search) => {
  try {
    const response = await axiosInstance.get(`/api/user/search?search=${search}`);
    return { status: 200, data: response.data.users };
  } catch (error) {
    return {
      data: error.response?.data?.message,
    };
  }
};

const postDisplayPicture = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/user/dp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return { 
      status: 200, 
      publicId: response.data.publicId, 
      message: response.data.message 
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const deleteDisplayPicture = async () => {
  try {
    const response = await axiosInstance.delete("api/user/dp");
    return { status: 200, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const removeContact = async (userId) => {
  try {
    await axiosInstance.delete(`/user/network/${userId}`);
    return { status: 200, message: "Connection removed" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

const userAPI = {
  getUser,
  searchUsers,
  updateUserInfo,
  removeContact,
  postDisplayPicture,
  deleteDisplayPicture,
};

export default userAPI;
