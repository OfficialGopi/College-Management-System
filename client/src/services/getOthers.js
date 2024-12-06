import { api } from "../utils/axiosConfig";

export const getTotalStudents = async () => {
  try {
    const response = await api.get("/others/getallstudents");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getTotalTeachers = async () => {
  try {
    const response = await api.get("/others/getallteachers");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getTeachers = async () => {
  try {
    const response = await api.get("/others/getallteachersdetails");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const postAvatar = async (_id, avatar) => {
  try {
    const form = new FormData();
    form.append("avatar", avatar);
    const response = await api.post(`/others/changeavatar/${_id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const res = await fetch(
    //   `http://localhost:8080/api/v1/others/changeavatar/${_id}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     avatar: avatar,
    //   }
    // );
    // const response = await res.json();
    if (!response.data.success) {
      throw response;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
