import { api } from "../utils/axiosConfig";

export const postStudent = async ({
	_id,
	studentName,
	email,
	mobileNumber,
	dateOfBirth,
	address,
	gender,
	bloodGroup,
	department,
	batchId,
}) => {
	try {
		const role = "student";

		const userPost = await api.post("/user", {
			_id: _id.value,
			name: studentName.value,
			role,
			email: email.value,
			mobileNumber: mobileNumber.value,
			dateOfBirth: dateOfBirth.value,
			gender: gender.value,
			address: address.value,
			bloodGroup: bloodGroup.value,
		});

		const studentDetailsPost = await api.post("/studentacademicdetails", {
			_id: _id.value,
			batchId: batchId.value,
			department: department.value,
		});
		console.log({
			...userPost,
			...studentDetailsPost,
		});
		return {
			...userPost,
			...studentDetailsPost,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};
