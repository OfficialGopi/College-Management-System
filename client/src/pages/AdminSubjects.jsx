import { useInputValidation } from "6pp";
import { Delete } from "@mui/icons-material";
import {
	Button,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import {
	addTeacherToSubject,
	getSubjects,
	postSubject,
} from "../services/subjects";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getTeachers } from "../services/getOthers";

const AdminSubjects = () => {
	const [subjects, setSubjects] = useState([]);
	const subjectName = useInputValidation("");
	const _id = useInputValidation("");
	const department = useInputValidation("CSE");
	const type = useInputValidation("Theory");
	const credit = useInputValidation(0, (val) => {
		if (!(Number(val) && val >= 0 && val <= 5)) {
			return {
				isValid: false,
				errorMessage: "Credit should be a number between 0 and 5.",
			};
		}
	});

	const semester = useInputValidation(1);

	const handleSubmit = (e) => {
		e.preventDefault();
		toast.promise(
			postSubject({
				subjectName: subjectName.value,
				_id: _id.value,
				department: department.value,
				type: type.value,
				credit: credit.value,
				semester: semester.value,
			}),
			{
				loading: "Saving...",
				success: <b>Settings saved!</b>,
				error: <b>Could not save.</b>,
			}
		);
		// .then((val) => console.log(val))
		// .catch((err) => {
		// 	console.log(err);
		// });
	};
	useEffect(() => {
		getSubjects().then((data) => {
			console.log(data.data);
			setSubjects(data.data);
		});
	}, []);
	return (
		<>
			<div className="h-full flex flex-col gap-4 w-full">
				<h1 className="text-3xl font-bold">Create Subjects</h1>
				<div className=" mt-1 flex  bg-slate-200 rounded-lg">
					<form className="p-4 flex w-full  text-black gap-4">
						<div
							className="flex flex-1  gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel id="SubjectName">
								Subject Name :{" "}
							</InputLabel>
							<TextField
								// labelId="SubjectName"
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={subjectName.value}
								onChange={(e) => subjectName.changeHandler(e)}
							/>
						</div>
						<div
							className="flex flex-1  gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel id="SubjectCode">
								Subject Code :{" "}
							</InputLabel>
							<TextField
								// labelId="SubjectCode"
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={_id.value}
								onChange={(e) => _id.changeHandler(e)}
							/>
						</div>
						<div
							className="flex flex-1  gap-1 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel id="Stream">Department : </InputLabel>
							<Select
								// labelId="Stream"
								label={"Stream"}
								defaultValue={department.value}
								autoComplete="true"
								onChange={(e) => department.changeHandler(e)}
							>
								<MenuItem value="CSE">CSE</MenuItem>
								<MenuItem value="LT">LT</MenuItem>
								<MenuItem value="IT">IT</MenuItem>
							</Select>
						</div>
						<div
							className="flex flex-1  gap-1 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel id="Type">Type : </InputLabel>
							<Select
								// labelId="Type"
								label={"Type"}
								defaultValue={type.value}
								autoComplete="true"
								onChange={(e) => type.changeHandler(e)}
							>
								<MenuItem value="Theory">Theory</MenuItem>
								<MenuItem value="Practical">Practical</MenuItem>
							</Select>
						</div>
						<div className="flex gap-1 flex-1 flex-col">
							<InputLabel id="Semester">Semester : </InputLabel>
							<Select
								// labelId="Semester"
								label={"Semester"}
								defaultValue={semester.value}
								onChange={(e) => semester.changeHandler(e)}
								autoComplete="true"
							>
								<MenuItem value={1}>1st</MenuItem>
								<MenuItem value={2}>2nd</MenuItem>
								<MenuItem value={3}>3rd</MenuItem>
								<MenuItem value={4}>4th</MenuItem>
								<MenuItem value={5}>5th</MenuItem>
								<MenuItem value={6}>6th</MenuItem>
								<MenuItem value={7}>7th</MenuItem>
								<MenuItem value={8}>8th</MenuItem>
							</Select>
						</div>
						<div
							className="flex flex-1  gap-2 flex-col"
							style={{
								height: "100%",
							}}
						>
							<InputLabel id="Credit">Credit: </InputLabel>
							<TextField
								// labelId="Credit"
								type="number"
								variant="filled"
								sx={{
									height: "100%",
								}}
								value={credit.value}
								onChange={(e) => credit.changeHandler(e)}
							/>
						</div>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "rgba(0,0,0,0.7)",
							}}
							type="submit"
							onClick={handleSubmit}
						>
							Save
						</Button>
					</form>
				</div>
				<SubjectsCreated
					subjects={subjects}
					setSubjects={setSubjects}
				/>
			</div>
		</>
	);
};

const SubjectsCreated = ({ subjects, setSubjects }) => {
	return (
		<div className="flex flex-col gap-1 bg-slate-300 rounded-xl p-4">
			<h2 className="text-lg font-bold">Subjects Created</h2>
			<div className="flex flex-col gap-2">
				{subjects.map((subject) => (
					<SubjectComp
						name={subject.subjectName}
						_id={subject._id}
						semester={subject.semester}
						department={subject.department}
						subTeacher={subject.teacher}
						credit={subject.credit}
						key={subject._id}
					/>
				))}
			</div>
		</div>
	);
};

const SubjectComp = ({ name, _id, semester, department, subTeacher }) => {
	const selectedTeacher = useInputValidation(subTeacher);
	const [teachers, setTeachers] = useState([]);

	const submitTeacher = (e) => {
		e.preventDefault();
		toast.promise(
			addTeacherToSubject({
				_id: _id,
				teacher: selectedTeacher.value,
			}),
			{
				loading: "Saving...",
				success: <b>Settings saved!</b>,
				error: <b>Could not save.</b>,
			}
		);
	};
	useEffect(() => {
		if (subTeacher) {
			console.log(subTeacher);
		}
		getTeachers().then((data) => setTeachers(data.data.teachers));
	}, []);
	return (
		<div className="flex rounded-lg items-center justify-between bg-slate-400 p-4 ">
			<div className="flex-col flex-1 flex justify-center">
				<h2 className="text-xl font-bold">Subject name : {name}</h2>
				<span className="text-lg font-semibold">
					Subject Code : {_id}
				</span>
				<span className="text-lg font-semibold">
					Department : {department}
				</span>
				<span className="text-lg font-semibold">
					Semester : {semester}
				</span>
			</div>
			<form className="flex-1 flex  gap-4">
				<div className="flex gap-1 flex-1 flex-col">
					<InputLabel id="Semester">Teacher Assigned : </InputLabel>
					<Select
						// labelId="Teachers"
						label={"Semester"}
						required={true}
						defaultValue={`${subTeacher}`}
						autoComplete="true"
						value={selectedTeacher.value}
						onChange={(e) => selectedTeacher.changeHandler(e)}
					>
						{teachers.map((teacherData, index) => (
							<MenuItem value={teacherData._id} key={index}>
								{teacherData.name} (Id : {teacherData._id})
							</MenuItem>
						))}
					</Select>
				</div>
				<Button
					onClick={submitTeacher}
					variant="contained"
					type="submit"
					sx={{
						backgroundColor: "rgba(0,0,0,0.7)",
					}}
				>
					Save
				</Button>
				<IconButton>
					<Delete />
				</IconButton>
			</form>
		</div>
	);
};

export default AdminSubjects;
