import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Assignment } from "@mui/icons-material";
const TeacherAssignmentsSpecific = () => {
	const [dueDate, setDueDate] = useState(dayjs(new Date()));
	useEffect(() => {
		console.log(dueDate);
	});
	const handleOnSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="h-full w-full flex flex-col gap-4 p-4">
			<form
				className="w-full flex p-5 flex-col gap-4 bg-black rounded-xl"
				onSubmit={handleOnSubmit}
			>
				<div className="w-full flex flex-col gap-4">
					<TextField
						className="w-full p-2 text-3xl rounded-3xl  focus:text-white invert"
						sx={{
							borderRadius: "12px",
						}}
						label=" Title"
						variant="outlined"
						size="36px"
					/>
				</div>
				<div className="w-full flex flex-col gap-4">
					<TextField
						className="w-full p-2 text-3xl rounded-3xl  focus:text-white invert "
						color="secondary"
						label="Descrption"
						variant="outlined"
						size="36px"
					/>
				</div>
				<div className="w-full flex items-center gap-2">
					<span className="text-white text-lg">Due Date : </span>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer
							components={["DatePicker", "DatePicker"]}
						>
							<DatePicker
								value={dueDate}
								label="Controlled picker"
								onChange={(newValue) => setDueDate(newValue)}
								defaultValue={dayjs(new Date())}
								sx={{
									borderRadius: "24px",
									color: "white",
									filter: "invert(100%)",
									backgroundColor: "white",
								}}
							/>
						</DemoContainer>
					</LocalizationProvider>
					<Button
						type="submit"
						variant="contained"
						sx={{
							backgroundColor: "#1A1D23",
							color: "white",
							borderRadius: "24px",
							height: "50px",
							width: "100px",
						}}
					>
						Submit
					</Button>
				</div>
			</form>
			<PrevAssignments />
		</div>
	);
};

const PrevAssignments = () => {
	return (
		<div className="w-full p-4 gap-2 rounded-xl flex flex-col overflow-y-scroll flex-1">
			<PrevAssignmentsSpecific />
			<PrevAssignmentsSpecific />
			<PrevAssignmentsSpecific />
			<PrevAssignmentsSpecific />
			<PrevAssignmentsSpecific />
		</div>
	);
};
const PrevAssignmentsSpecific = () => {
	return (
		<Link
			to={"id"}
			className="w-full bg-black p-4 gap-4 text-white flex items-center  rounded-xl"
		>
			<Assignment fontSize="large" />
			<div className="flex gap-2 flex-col">
				<span className="font-bold text-2xl">Title : Hello World</span>
				<span className="font-semibold text-xl">
					Description : Hello World Hello World Hello World Hello
					World Hello World Hello World
				</span>
			</div>
		</Link>
	);
};
export default TeacherAssignmentsSpecific;
