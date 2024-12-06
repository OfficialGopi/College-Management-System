import { api } from "../utils/axiosConfig";

export const postSubject = async (subject) => {
	try {
		const response = await api.post("/subjects", subject);
		return response.data;
	} catch (error) {
		console.log(error);
		// Throw the error to ensure the promise is rejected
		throw error;
	}
};

export const getSubjects = async () => {
	try {
		const response = await api.get("/subjects");
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};

export const addTeacherToSubject = async ({ _id, teacher }) => {
	try {
		console.log(_id, teacher);
		const response = await api.put(`/subjects/teacher/${_id}`, { teacher });
		return response.data;
	} catch (error) {
		console.log(error);
		// Throw the error to ensure the promise is rejected
		throw error;
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
