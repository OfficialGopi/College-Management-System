import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { getRoutineStudent } from "../services/routine";
import { useSelector } from "react-redux";

function Routine() {
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const shifts = ["1st Shift", "2nd Shift", "3rd Shift", "4th Shift"];
	const [routine, setRoutine] = useState([]);
	const auth = useSelector((state) => state.auth.value);

	useEffect(() => {
		getRoutineStudent({
			department: auth.department,
			semester: auth.semester,
		}).then((res) => {
			setRoutine(res.data);
		});
	}, []);
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								borderRight: "1px solid #ddd",
								fontWeight: 800,
							}}
						>
							Day
						</TableCell>
						{shifts.map((shift, index) => (
							<TableCell
								key={index}
								align="center"
								sx={{
									backgroundColor: "#f0f0f0",
									borderRight: "1px solid #ddd",
									fontWeight: 800,
								}}
							>
								{shift}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{days.map((day, index) => (
						<TableRow key={index}>
							<TableCell
								component="th"
								scope="row"
								sx={{
									backgroundColor: "#f0f0f0",
									borderRight: "1px solid #ddd",
									fontWeight: 800,
								}}
							>
								{day}
							</TableCell>
							{shifts.map((shift, shiftIndex) => (
								<TableCell key={shiftIndex} align="center">
									{routine.find((r) => {
										console.log(r);
										return (
											r.day === index + 1 &&
											r.shift === shiftIndex + 1
										);
									})}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Routine;
