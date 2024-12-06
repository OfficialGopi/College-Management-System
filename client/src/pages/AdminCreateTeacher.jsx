import { useInputValidation } from "6pp";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTeachers, postTeacher, updateTeacher } from "../services/teacher";
import { Edit } from "@mui/icons-material";
import dayjs from "dayjs";

const AdminCreateTeacher = () => {
	const teacherName = useInputValidation("");
	const _id = useInputValidation("");
	const gender = useInputValidation("male");
	const email = useInputValidation("");
	const address = useInputValidation("");
	const dateOfBirth = useInputValidation(new Date());
	const mobileNumber = useInputValidation("");
	const bloodGroup = useInputValidation("A+");
	const handleSubmit = (e) => {
		e.preventDefault();
		toast
			.promise(
				postTeacher({
					_id,
					teacherName,
					gender,
					email,
					address,
					dateOfBirth,
					mobileNumber,
					bloodGroup,
				}),
				{
					loading: "Creating...",
					success: <b>Teacher created!</b>,
					error: <b>Could not create Teacher.</b>,
				}
			)
			.then(() => {})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<div className="h-full flex flex-col gap-4 w-full">
				<h1 className="text-3xl font-bold">Create Teachers</h1>
				<div className=" mt-1 flex  bg-slate-200 rounded-lg">
					<form className="p-4 flex w-full  flex-wrap justify-center items-center text-black gap-2">
						<div className="w-[90%] flex flex-wrap gap-4">
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Teacher Name : </InputLabel>
								<TextField
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={teacherName.value}
									onChange={(e) =>
										teacherName.changeHandler(e)
									}
								/>
							</div>
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Teacher Id : </InputLabel>
								<TextField
									type="number"
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={_id.value}
									onChange={(e) => _id.changeHandler(e)}
								/>
							</div>
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Email : </InputLabel>
								<TextField
									type="email"
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={email.value}
									onChange={(e) => email.changeHandler(e)}
								/>
							</div>
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Mobile Number : </InputLabel>
								<TextField
									type="tel"
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={mobileNumber.value}
									onChange={(e) =>
										mobileNumber.changeHandler(e)
									}
								/>
							</div>
							<div
								className="flex w-1/6   gap-1 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Date Of Birth : </InputLabel>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DatePicker
										onChange={(e) => {
											const date = {
												target: {
													value: e.$d,
												},
											};
											dateOfBirth.changeHandler(date);
										}}
									/>
								</LocalizationProvider>
							</div>
							<div
								className="flex w-1/6   gap-1 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Gender : </InputLabel>
								<Select
									autoComplete="true"
									value={gender.value}
									onChange={(e) => gender.changeHandler(e)}
								>
									<MenuItem value="male">Male</MenuItem>
									<MenuItem value="female">Female</MenuItem>
									<MenuItem value="others">Others</MenuItem>
								</Select>
							</div>

							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Address: </InputLabel>
								<TextField
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={address.value}
									onChange={(e) => address.changeHandler(e)}
								/>
							</div>
							<div
								className="flex w-1/6   gap-1 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Blood Group : </InputLabel>
								<Select
									required={true}
									label="Blood Group"
									variant="filled"
									value={bloodGroup.value}
									onChange={(e) =>
										bloodGroup.changeHandler(e)
									}
								>
									<MenuItem value="A+">A+</MenuItem>
									<MenuItem value="A-">A-</MenuItem>
									<MenuItem value="B+">B+</MenuItem>
									<MenuItem value="B-">B-</MenuItem>
									<MenuItem value="AB+">AB+</MenuItem>
									<MenuItem value="AB-">AB-</MenuItem>
									<MenuItem value="O+">O+</MenuItem>
									<MenuItem value="O-">O-</MenuItem>
								</Select>
							</div>
						</div>
						<Button
							variant="contained"
							sx={{
								height: "50%",
								backgroundColor: "rgba(0,0,0,0.7)",
							}}
							type="submit"
							onClick={handleSubmit}
						>
							Save
						</Button>
					</form>
				</div>
				<CreatedTeahcers />
			</div>
		</>
	);
};

const CreatedTeahcers = ({}) => {
	const [createdTeachers, setCreatedTeachers] = useState([]);
	useEffect(() => {
		getTeachers().then((teachers) => {
			setCreatedTeachers(teachers.data.teachers);
		});
	}, []);
	return (
		<div className="w-full rounded-md p-3 bg-slate-200">
			<h1 className="font-bold text-3xl p-4">Teachers Created</h1>
			<div className="w-full flex flex-col gap-3">
				{createdTeachers.map((teacher) => (
					<CreatedTeachersDetails
						key={teacher._id}
						teacher={teacher}
					/>
				))}
			</div>
		</div>
	);
};

const CreatedTeachersDetails = ({ teacher }) => {
	const {
		_id,
		name,
		bloodGroup,
		address,
		dateOfBirth,
		gender,
		email,
		mobileNumber,
		avatarUrl,
	} = teacher;
	const [EditDialogOpen, setEditDialogOpen] = useState(false);

	const handleEdit = () => {
		setEditDialogOpen(true);
	};
	return (
		<div className="flex justify-between items-center gap-4 bg-slate-300 p-3 rounded-lg">
			<div>
				<Avatar
					src={avatarUrl}
					style={{
						width: 100,
						height: 100,
					}}
				/>
			</div>
			<div className=" flex flex-1 flex-col  ">
				<h1 className="text-2xl font-bold">Teacher Name: {name}</h1>
				<h1 className="text-2xl font-bold">Teacher Id: {_id}</h1>
				<h1 className="text-xl font-bold">Blood Group: {bloodGroup}</h1>
				<h1 className="text-xl font-bold">Address: {address}</h1>
				<h1 className="text-xl font-bold">
					Date of Birth: {dateOfBirth.split("T")[0]}
				</h1>
				<h1 className="text-xl font-bold">Gender: {gender}</h1>
				<h1 className="text-xl font-bold">Email: {email}</h1>
				<h1 className="text-xl font-bold">
					Mobile Number : {mobileNumber}
				</h1>
			</div>
			<div className="flex flex-col gap-2">
				<IconButton
					variant="contained"
					color="primary"
					onClick={handleEdit}
				>
					<Edit />
				</IconButton>
			</div>
			<EditDialog
				EditDialogOpen={EditDialogOpen}
				setEditDialogOpen={setEditDialogOpen}
				teacher={teacher}
			/>
		</div>
	);
};

const EditDialog = ({ EditDialogOpen, setEditDialogOpen, teacher }) => {
	const teacherName = useInputValidation(teacher.name ? teacher.name : "");
	const gender = useInputValidation(teacher.gender ? teacher.gender : "male");
	const email = useInputValidation(teacher.email ? teacher.email : "");
	const address = useInputValidation(teacher.address ? teacher.address : "");
	const dateOfBirth = useInputValidation(
		teacher.dateOfBirth ? new Date(teacher.dateOfBirth) : new Date()
	);
	const mobileNumber = useInputValidation(
		teacher.mobileNumber ? teacher.mobileNumber : ""
	);
	const bloodGroup = useInputValidation(
		teacher.bloodGroup ? teacher.bloodGroup : "A+"
	);
	const handleDialogClose = () => {
		setEditDialogOpen(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		toast
			.promise(
				updateTeacher({
					_id: teacher._id,
					name: teacherName.value,
					gender: gender.value,
					email: email.value,
					address: address.value,
					dateOfBirth: dateOfBirth.value,
					mobileNumber: mobileNumber.value,
					bloodGroup: bloodGroup.value,
				}),
				{
					loading: <b>loading</b>,
					success: <b>Teacher updated successfully</b>,
					error: <b>Failed to update teacher</b>,
				}
			)
			.then(() => {
				setEditDialogOpen(false);
			});
	};

	return (
		<Dialog open={EditDialogOpen} onClose={handleDialogClose}>
			<DialogTitle>Edit Teacher : Id {teacher._id}</DialogTitle>
			<div className=" p-4 w-96">
				<form className="p-4 flex-col flex  w-full  flex-wrap justify-center items-center text-black gap-2">
					<div className="flex-col flex flex-wrap gap-4">
						<div
							className="flex    gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Teacher Name : </InputLabel>
							<TextField
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={teacherName.value}
								onChange={(e) => teacherName.changeHandler(e)}
							/>
						</div>

						<div
							className="flex    gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Email : </InputLabel>
							<TextField
								type="email"
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={email.value}
								onChange={(e) => email.changeHandler(e)}
							/>
						</div>
						<div
							className="flex    gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Mobile Number : </InputLabel>
							<TextField
								type="tel"
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={mobileNumber.value}
								onChange={(e) => mobileNumber.changeHandler(e)}
							/>
						</div>
						<div
							className="flex    gap-1 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Date Of Birth : </InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{/* <DemoContainer components={["DatePicker"]}> */}
								<DatePicker
									value={dayjs(new Date(dateOfBirth.value))}
									onChange={(e) => {
										const date = {
											target: {
												value: e.$d,
											},
										};
										dateOfBirth.changeHandler(date);
									}}
								/>
								{/* </DemoContainer> */}
							</LocalizationProvider>
						</div>
						<div
							className="flex   gap-1 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Gender : </InputLabel>
							<Select
								autoComplete="true"
								value={gender.value}
								onChange={(e) => gender.changeHandler(e)}
							>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
								<MenuItem value="others">Others</MenuItem>
							</Select>
						</div>

						<div
							className="flex    gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Address: </InputLabel>
							<TextField
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={address.value}
								onChange={(e) => address.changeHandler(e)}
							/>
						</div>
						<div
							className="flex    gap-1 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel>Blood Group : </InputLabel>
							<Select
								required={true}
								label="Blood Group"
								variant="filled"
								value={bloodGroup.value}
								onChange={(e) => bloodGroup.changeHandler(e)}
							>
								<MenuItem value="A+">A+</MenuItem>
								<MenuItem value="A-">A-</MenuItem>
								<MenuItem value="B+">B+</MenuItem>
								<MenuItem value="B-">B-</MenuItem>
								<MenuItem value="AB+">AB+</MenuItem>
								<MenuItem value="AB-">AB-</MenuItem>
								<MenuItem value="O+">O+</MenuItem>
								<MenuItem value="O-">O-</MenuItem>
							</Select>
						</div>
					</div>
					<Button
						variant="contained"
						sx={{
							height: "50%",
							backgroundColor: "rgba(0,0,0,0.7)",
						}}
						type="submit"
						onClick={handleSubmit}
					>
						Save
					</Button>
				</form>
			</div>
		</Dialog>
	);
};

export default AdminCreateTeacher;
