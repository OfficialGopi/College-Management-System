import { api } from "../utils/axiosConfig";

export const postSubject = async (subject) => {
  try {
    const response = await api.post("/subjects", subject);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const addTeacherToSubject = async ({ _id, teacher }) => {
  try {
    const response = await api.put(`/subjects/teacher/${_id}`, { teacher });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubjectsBySem = async ({ semester, department }) => {
  try {
    const response = await api.get(`/subjects/${department}/${semester}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
