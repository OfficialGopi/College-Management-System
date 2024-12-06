import { api } from "./../utils/axiosConfig";

export const getNotices = async () => {
	try {
		const response = await api.get("/notices");
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};
