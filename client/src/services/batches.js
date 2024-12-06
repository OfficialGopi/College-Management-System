import { api } from "../utils/axiosConfig";

export const getBatches = async () => {
	try {
		const response = await api.get("/batches");
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};

export const postBatch = async (startingYear) => {
	try {
		console.log(startingYear);
		const response = await api.post("/batches", {
			startingYear: new Date(startingYear),
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
