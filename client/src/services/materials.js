import { api } from "../utils/axiosConfig";

export const getMaterials = async ({ batchId, subjectCode }) => {
	try {
		const response = await api.get(`/materials/${batchId}/${subjectCode}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
