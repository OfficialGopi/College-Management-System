import { api } from "../utils/axiosConfig";

export const getResults = async (_id) => {
	try {
		const response = await api.get(`/result/${_id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};
