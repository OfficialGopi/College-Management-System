import { api } from "../utils/axiosConfig";

export const postTeacher = async ({
	_id,
	teacherName,
	email,
	mobileNumber,
	dateOfBirth,
	address,
	gender,
	bloodGroup,
}) => {
	try {
		const role = "teacher";

		const userPost = await api.post("/user", {
			_id: _id.value,
			name: teacherName.value,
			role,
			email: email.value,
			mobileNumber: mobileNumber.value,
			dateOfBirth: dateOfBirth.value,
			gender: gender.value,
			address: address.value,
			bloodGroup: bloodGroup.value,
		});

		return {
			...userPost,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export const getTeachers = async () => {
	try {
		const response = await api.get("/others/getallteachersdetails");

		return response.data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const updateTeacher = async ({
	_id,
	name,
	email,
	mobileNumber,
	dateOfBirth,
	address,
	gender,
	bloodGroup,
}) => {
	try {
		const response = await api.put(`/user/update/${_id}`, {
			name: name,
			email: email,
			mobileNumber: mobileNumber,
			dateOfBirth: dateOfBirth,
			gender: gender,
			address: address,
			bloodGroup: bloodGroup,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
};
