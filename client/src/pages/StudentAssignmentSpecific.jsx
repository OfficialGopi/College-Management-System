import { useFileHandler } from "6pp";
import {
	Add,
	AdsClickOutlined,
	Assignment,
	ChangeCircle,
	Close,
	Done,
	Edit,
	Error,
	FilterBAndW,
	Pending,
	RunCircleTwoTone,
	RunningWithErrors,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAssignments } from "../services/assignments";

const StudentAssignmentSpecific = () => {
	const { subjectCode } = useParams();
	const [assignments, setAssignments] = useState([]);
	const auth = useSelector((state) => state.auth.value);
	assignments.sort((a, b) => {
		if (new Date(a.date) < new Date(b.date)) return 1;
		if (new Date(a.date) > new Date(b.date)) return -1;
		if (new Date(a.date) == new Date(b.date)) return 0;
	});
	useEffect(() => {
		getAssignments({
			batchId: auth.batchId._id,
			subjectCode: subjectCode,
		}).then((data) => {
			setAssignments(data.data);
		});
	}, []);
	return (
		<div className="flex h-full w-full">
			{/* Main Content */}
			<div className="flex-1 p-6">
				<h1 className="text-3xl font-bold mb-4"> Assignments</h1>
				<div className="flex flex-col w-full  gap-4">
					{assignments.length > 0 ? (
						assignments.map((assignment, index) => {
							return (
								<AssignmentComp
									title={assignment.title}
									description={assignment.description}
									dueDate={assignment.dueDate}
									isOpen={assignment.isOpen}
									isSubmit={assignment.status.isSubmit}
									key={index}
									date={assignment.date}
									url={assignment.status.url}
									submitDate={assignment.status.date}
								/>
							);
						})
					) : (
						<div>
							<p>No assignments available</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const AssignmentComp = ({
	title,
	description,
	dueDate,
	isOpen,
	isSubmit,
	date,
	url,
	submitDate,
}) => {
	const file = useFileHandler("single", 5);

	const handleFileSubmit = () => {
		//checkfileispdf
	};
	const handleChangeFile = () => {
		//checkfileispdf
	};
	return (
		<div className="w-full p-4 rounded-xl gap-4 text-wrap bg-gradient-to-br justify-between text-white from-black via-black to-slate-700   items-center flex min-h-20 border">
			<Assignment fontSize="large" />
			<div className="flex flex-col flex-1">
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-lg">{description}</p>
				<Typography color="info" className="text-sm">
					Last Date of submission: {dueDate}
				</Typography>
				{isSubmit && !isOpen && (
					<Typography color="success" className="text-sm">
						Submitted on : {submitDate}
					</Typography>
				)}
				{isSubmit && isOpen && (
					<Typography color="success" className="text-sm">
						Submitted on : {submitDate}
						<br /> You can change the file if you uploaded wrong
						file
					</Typography>
				)}
				{!isSubmit && !isOpen && (
					<Typography color="error" className="text-sm">
						You haven't submitted the file
					</Typography>
				)}
				{!isSubmit && isOpen && new Date() > new Date(dueDate) && (
					<Typography color="warning" className="text-sm">
						Submit the file ASAP. Deadline date came
					</Typography>
				)}
			</div>

			<Stack direction={"row"} alignItems={"center"} color={"inherit"}>
				{!isSubmit ? (
					<>
						<Tooltip title={isOpen ? "Add Attachment" : "Time up"}>
							{!isOpen ? (
								<Error color="inherit" size="medium" />
							) : (
								<>
									{file.file && (
										<div
											style={{
												position: "relative",
												width: "200px",
												height: "100px",
												border: "2px solid  gray",
												borderRadius: "10px",
												overflow: "hidden",
											}}
										>
											<object
												data={file.preview}
												type="application/pdf"
												style={{
													width: "100%",
													height: "100%",
													objectFit: "fill",
													zIndex: 0,
												}}
											></object>
											<IconButton
												style={{
													position: "absolute",
													top: "10px",
													right: "10px",
													zIndex: 10,
													backgroundColor: "gray",
												}}
												onClick={file.clear}
											>
												<Close fontSize="small" />
											</IconButton>
										</div>
									)}
									{isOpen && !file.file && (
										<Tooltip title="Add Attachment">
											<IconButton
												color="inherit"
												size="medium"
												sx={{
													position: "relative",
													overflow: "hidden",
												}}
												component={"label"}
											>
												<Add
													sx={{
														color: "white",
													}}
												/>
												<TextField
													type="file"
													onChange={
														file.changeHandler
													}
													sx={{
														width: 0,
														height: 0,
														overflow: "hidden",
														position: "absolute",
													}}
												></TextField>
											</IconButton>
										</Tooltip>
									)}
								</>
							)}
						</Tooltip>
						{isOpen && file.file && (
							<>
								<Button
									variant="contained"
									type="submit"
									color=""
									sx={{
										color: "white",
									}}
									onClick={handleFileSubmit}
								>
									<AdsClickOutlined />
									Submit
								</Button>
							</>
						)}
					</>
				) : (
					<Tooltip
						title={
							isOpen
								? "Change Attachment"
								: "You have submitted this assignment"
						}
					>
						{!isOpen ? (
							<Done
								sx={{
									color: "white",
								}}
							/>
						) : (
							<>
								<div
									style={{
										position: "relative",
										width: "200px",
										height: "100px",
										border: "2px solid  gray",
										borderRadius: "10px",
										overflow: "hidden",
									}}
								>
									<object
										data={file.file ? file.preview : url}
										type="application/pdf"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "fill",
											zIndex: 0,
										}}
									></object>
									<IconButton
										style={{
											position: "absolute",
											top: "2px",
											right: "20px",
											zIndex: 10,
											backgroundColor: "gray",
										}}
										onClick={file.clear}
									>
										<Close fontSize="small" />
									</IconButton>
								</div>

								{!file.file && (
									<Tooltip title="Change File">
										<IconButton
											color="inherit"
											size="medium"
											sx={{
												position: "relative",
												overflow: "hidden",
											}}
											component={"label"}
										>
											<ChangeCircle
												sx={{
													color: "white",
												}}
											/>
											<TextField
												type="file"
												onChange={file.changeHandler}
												sx={{
													width: 0,
													height: 0,
													overflow: "hidden",
													position: "absolute",
												}}
											></TextField>
										</IconButton>
									</Tooltip>
								)}
								{file.file && (
									<>
										<Button
											variant="contained"
											type="submit"
											color=""
											sx={{
												color: "white",
											}}
											onClick={handleChangeFile}
										>
											<AdsClickOutlined />
											Submit
										</Button>
									</>
								)}
							</>
						)}
					</Tooltip>
				)}
			</Stack>
		</div>
	);
};

export default StudentAssignmentSpecific;
