import { api } from "../utils/axiosConfig";

export const adminAuth = async (username, password) => {
  try {
    const res = await api.post("/admin/login", { username, password });

    if (!res.data.success) {
      throw {
        success: false,
        message: "hi",
      };
    }
    return res.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const getToken = async (role, id, password) => {
  try {
    const data = await api.get(
      `/user/gettoken?_id=${id}&role=${role}&password=${password}`
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const loginByToken = async (token) => {
  try {
    const data = await api.get(`/user/`, {
      headers: {
        authorization: token,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
