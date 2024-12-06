import { useInputValidation } from "6pp";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { getBatches } from "../services/batches";
import { postStudent } from "../services/student";
import toast from "react-hot-toast";

const AdminCreateStudent = () => {
	const studentName = useInputValidation("");
	const _id = useInputValidation("");
	const gender = useInputValidation("male");
	const email = useInputValidation("");
	const address = useInputValidation("");
	const dateOfBirth = useInputValidation(new Date());
	const mobileNumber = useInputValidation("");
	const bloodGroup = useInputValidation("A+");
	const batchId = useInputValidation("");
	const department = useInputValidation("CSE");
	const handleSubmit = (e) => {
		e.preventDefault();
		toast
			.promise(
				postStudent({
					_id,
					studentName,
					gender,
					email,
					address,
					dateOfBirth,
					mobileNumber,
					bloodGroup,
					department,
					batchId,
				}),
				{
					loading: "Creating...",
					success: <b>Student created!</b>,
					error: <b>Could not create student.</b>,
				}
			)
			.then(() => {})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<div className="h-full flex flex-col gap-4 w-full">
				<h1 className="text-3xl font-bold">Create Students</h1>
				<div className=" mt-1 flex  bg-slate-200 rounded-lg">
					<form className="p-4 flex w-full  flex-wrap justify-center items-center text-black gap-2">
						<div className="w-[90%] flex flex-wrap gap-4">
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Student Name : </InputLabel>
								<TextField
									variant="filled"
									sx={{
										height: "100%",
									}}
									value={studentName.value}
									onChange={(e) =>
										studentName.changeHandler(e)
									}
								/>
							</div>
							<div
								className="flex w-1/6   gap-2 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Student Id : </InputLabel>
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
											console.log(date);
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
							<div
								className="flex w-1/6   gap-1 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Department : </InputLabel>
								<Select
									label={"Stream"}
									value={department.value}
									autoComplete="true"
									onChange={(e) =>
										department.changeHandler(e)
									}
								>
									<MenuItem value="CSE">CSE</MenuItem>
									<MenuItem value="IT">IT</MenuItem>
									<MenuItem value="LT">LT</MenuItem>
								</Select>
							</div>
							<div
								className="flex w-1/6   gap-1 flex-col"
								style={{
									height: "100%",
								}}
							>
								<InputLabel>Batch Id : </InputLabel>

								<Batch batchId={batchId} />
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
			</div>
		</>
	);
};

const Batch = ({ batchId }) => {
	const [batches, setBatches] = useState([]);
	useEffect(() => {
		getBatches().then((allBatches) => {
			const filteredBatches = allBatches.data.filter(
				(batch) => batch.isRunning
			);
			setBatches(filteredBatches);
		});
	}, []);
	return (
		<Select
			label={"batchId"}
			value={batchId.value}
			autoComplete="true"
			onChange={(e) => batchId.changeHandler(e)}
		>
			{batches.map((batch) => (
				<MenuItem key={batch._id} value={batch._id}>
					{new Date(batch.startingYear).getFullYear()}
				</MenuItem>
			))}
		</Select>
	);
};

export default AdminCreateStudent;
