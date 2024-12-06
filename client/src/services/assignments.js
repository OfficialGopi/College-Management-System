import { api } from "../utils/axiosConfig.js";

export const getAssignments = async ({ batchId, subjectCode }) => {
	try {
		const response = await api.get(
			`/assignments/${batchId}/${subjectCode}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
