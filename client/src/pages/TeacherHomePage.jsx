import { Box, Typography, Grid, Card } from "@mui/material";
import { Schedule } from "@mui/icons-material"; // For next class icon

import { Pie, Bar, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	// Line,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement
);

// Data for charts
const attendanceData = {
	labels: ["Present", "Absent"],
	datasets: [
		{
			data: [80, 20],
			backgroundColor: ["#82ca9d", "#ff6347"],
		},
	],
};

const resultsData = {
	labels: ["Math", "Science", "History"],
	datasets: [
		{
			label: "Results Overview",
			data: [400, 300, 300],
			backgroundColor: "#82ca9d",
		},
	],
};
const assignmentData = {
	labels: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	datasets: [
		{
			label: "Assignments",
			data: [5, 7, 3, 8, 10, 6, 4, 9, 7, 6, 5, 8], // Sample data
			borderColor: "rgba(54, 162, 235, 1)",
			backgroundColor: "rgba(54, 162, 235, 0.2)",
			tension: 0.4, // Smooth the line curve
			fill: true,
		},
	],
};
const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Monthly Assignments",
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
const TeacherHomePage = () => {
	return (
		<Box
			sx={{
				display: "flex",
				height: "100%",
				bgcolor: "white",
				color: "black",
				width: "100%",
			}}
		>
			<Box sx={{ flexGrow: 1, padding: "3rem", width: "100%" }}>
				<Typography variant="h4" gutterBottom>
					Welcome back, {"Gopikanta Mondal"}!
				</Typography>

				<main className=" w-full flex flex-col">
					<div className="flex gap-4 w-full">
						<div className="flex flex-col">
							{/* Next Class Card */}
							<Grid
								item
								xs={12}
								sx={{
									width: "400px",
									height: "100px",
								}}
								// md={4}
							>
								<Card
									sx={{
										padding: "2rem",
										background:
											"linear-gradient(145deg, #000000, #434343)", // Black gradient
										color: "white",
										borderRadius: "15px", // Medium rounding
										display: "flex",
										alignItems: "center",
										gap: 2,
										boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
										height: "100%",
									}}
								>
									<Schedule sx={{ fontSize: 40 }} />
									<Box>
										<Typography variant="h6">
											Next Class
										</Typography>
										<Typography variant="body1">
											Subject: Math
										</Typography>
										<Typography variant="body1">
											Time: 10:00 AM
										</Typography>
									</Box>
								</Card>
							</Grid>

							{/* Completed Assignments Card */}
							<Grid
								item
								xs={12}
								md={4}
								sx={{
									width: "600px",
								}}
							>
								<Card
									sx={{
										padding: 2,
										boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
										marginTop: 3, // Space between the Next Class and Completed Assignments
										height: "100%",
									}}
								>
									<Typography variant="h6">
										Given Assignments
									</Typography>
									<Line
										data={assignmentData}
										options={options}
									/>
								</Card>
							</Grid>
						</div>

						{/* Attendance Chart */}
						<Grid
							item
							xs={12}
							sx={{
								width: "400px",
							}}
						>
							<Card
								sx={{
									padding: 2,
									boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
								}}
							>
								<Typography variant="h6">Attendance</Typography>
								<Pie data={attendanceData} />
							</Card>
						</Grid>
					</div>

					{/* Results Overview Chart */}
				</main>
			</Box>
		</Box>
	);
};

export default TeacherHomePage;
