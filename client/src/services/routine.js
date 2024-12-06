import { api } from "../utils/axiosConfig";

export const getRoutineStudent = async ({ department, semester }) => {
	try {
		const response = await api.get(
			`/routine/student/${department}/${semester}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};
