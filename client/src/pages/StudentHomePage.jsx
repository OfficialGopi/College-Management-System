import { Box, Typography, Grid, Card } from "@mui/material";
import { Schedule } from "@mui/icons-material"; // For next class icon

import { Pie, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
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

const completedAssignmentsData = {
	labels: ["Completed", "Pending"],
	datasets: [
		{
			label: "Assignments",
			data: [75, 25],
			backgroundColor: ["#8884d8", "#ffb6c1"],
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
const nextClass = () => {
	// if(new Date().getTime())
};
const StudentHomePage = () => {
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
										Completed Assignments
									</Typography>
									<Bar
										height={"100%"}
										data={completedAssignmentsData}
									/>
								</Card>
							</Grid>
						</div>

						{/* Attendance Chart */}
						<Grid
							item
							xs={12}
							sx={{
								width: "370px",
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
					<Grid
						item
						xs={12}
						sx={{
							marginTop: 10,
						}}
					>
						<Card
							sx={{
								padding: 2,
								boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
								width: "600px",
							}}
						>
							<Typography variant="h6">
								Results Overview
							</Typography>
							<Bar data={resultsData} />
						</Card>
					</Grid>
				</main>
			</Box>
		</Box>
	);
};

export default StudentHomePage;
