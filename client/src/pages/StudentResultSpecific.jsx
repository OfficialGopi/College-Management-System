import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResults } from "../services/result";

function StudentResultSpecific() {
	const [results, setResults] = useState([]);
	const auth = useSelector((state) => state.auth.value);
	const totalCredits = results.reduce(
		(acc, subject) => acc + subject.credit,
		0
	);
	const totalCreditPoints = results.reduce(
		(acc, subject) => acc + subject.totalCreditPoints,
		0
	);
	const SGPA = (totalCreditPoints / totalCredits).toFixed(2);
	const { sem } = useParams();
	useEffect(() => {
		getResults(auth._id).then((results) => {
			const filteredResults = results.data.filter((e) => {
				return e.subjects._id.semester === sem;
			});
			setResults(filteredResults);
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
								color: "#000",
								fontSize: "1.2rem",
							}}
						>
							Subject
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								color: "#000",
								fontSize: "1.2rem",
							}}
							align="center"
						>
							Credit
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								color: "#000",
								fontSize: "1.2rem",
							}}
							align="center"
						>
							Subject Type
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								color: "#000",
								fontSize: "1.2rem",
							}}
							align="center"
						>
							Points Achieved
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								color: "#000",
								fontSize: "1.2rem",
							}}
							align="center"
						>
							Grade
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
								color: "#000",
								fontSize: "1.2rem",
							}}
							align="center"
						>
							Total Credit Points
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{results.map((subject, index) => (
						<TableRow key={index}>
							<TableCell
								sx={{
									backgroundColor: "#f0f0f0",
									color: "#000",
									fontSize: "1.2rem",
								}}
							>
								{subject.subjectName}
							</TableCell>
							<TableCell align="center">
								{subject.credit}
							</TableCell>
							<TableCell align="center">{subject.type}</TableCell>
							<TableCell align="center">
								{subject.points}
							</TableCell>
							<TableCell align="center">
								{subject.grade}
							</TableCell>
							<TableCell align="center">
								{subject.totalCreditPoints}
							</TableCell>
						</TableRow>
					))}
					{/* SGPA Row */}
					<TableRow>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
							}}
							colSpan={4}
						/>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
							}}
							align="right"
						>
							<strong>SGPA</strong>
						</TableCell>
						<TableCell
							sx={{
								backgroundColor: "#f0f0f0",
							}}
							align="center"
						>
							<strong>{SGPA}</strong>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default StudentResultSpecific;
