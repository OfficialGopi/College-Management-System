import { api } from "./../utils/axiosConfig";

export const getNotices = async () => {
  try {
    const response = await api.get("/notices");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
